import {authenticateCognitoIdentity, readBearerToken} from "../../../clinical/authentication";
import {mapIdentityToPrincipal} from "../../../clinical/runtime";
import type {Principal} from "../../../clinical/authorization";

export class ApiError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
  }
}

export function json(data: unknown, status = 200, correlationId?: string): Response {
  const headers = new Headers({"content-type": "application/json"});
  if (correlationId) headers.set("x-correlation-id", correlationId);
  return new Response(JSON.stringify(data), {status, headers});
}

export function errorResponse(error: unknown, correlationId: string): Response {
  if (error instanceof ApiError) return json({error: {code: error.code, message: error.message}}, error.status, correlationId);
  return json({error: {code: "REQUEST_FAILED", message: "The request could not be completed."}}, 500, correlationId);
}

export async function requirePrincipal(request: Request): Promise<{principal: Principal; correlationId: string}> {
  const correlationId = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  const token = readBearerToken(request.headers.get("authorization"));
  if (!token) throw new ApiError(401, "UNAUTHENTICATED", "Authentication is required.");
  try {
    const identity = await authenticateCognitoIdentity(token);
    return {principal: await mapIdentityToPrincipal(identity, correlationId), correlationId};
  } catch {
    throw new ApiError(401, "UNAUTHENTICATED", "Authentication is required.");
  }
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    return body as Record<string, unknown>;
  } catch {
    throw new ApiError(400, "INVALID_REQUEST", "The request body is invalid.");
  }
}
