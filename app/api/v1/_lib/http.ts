import { randomUUID } from "node:crypto";
import { authenticateCognitoIdentity, readBearerToken } from "../../../clinical/authentication";
import { mapIdentityToPrincipal } from "../../../clinical/runtime";
import { getPostgresDb } from "../../../../db/postgres";
import { recordAudit } from "../../../clinical/events";
import type { Principal } from "../../../clinical/authorization";

export class ApiError extends Error {
  constructor(public readonly status: number, public readonly code: string, message: string) {
    super(message);
  }
}

export function correlationId(request: Request): string {
  const supplied = request.headers.get("x-correlation-id")?.trim();
  return supplied && supplied.length <= 128 && !/[\r\n]/.test(supplied) ? supplied : randomUUID();
}

export function json(data: unknown, status = 200, id?: string): Response {
  const response = Response.json(data, { status });
  if (id) response.headers.set("X-Correlation-Id", id);
  return response;
}

export function errorResponse(error: unknown, id: string): Response {
  const known = error instanceof ApiError ? error : new ApiError(500, "INTERNAL_ERROR", "An internal error occurred.");
  return json({ error: { code: known.code, message: known.message, correlationId: id } }, known.status, id);
}

export async function requirePrincipal(request: Request): Promise<{ principal: Principal; correlationId: string }> {
  const id = correlationId(request);
  const bearerToken = readBearerToken(request.headers.get("authorization"));
  const cookieHeader = request.headers.get("cookie");
  const cookieToken = readCookie(cookieHeader, "rejuvonix_access_token");
  if (!bearerToken && cookieToken && ["POST", "PATCH", "PUT", "DELETE"].includes(request.method)) {
    const csrfCookie = readCookie(cookieHeader, "rejuvonix_csrf");
    const csrfHeader = request.headers.get("x-csrf-token");
    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
      throw new ApiError(403, "CSRF_VALIDATION_FAILED", "The request could not be validated.");
    }
  }
  const token = bearerToken ?? cookieToken;
  if (!token) throw new ApiError(401, "AUTHENTICATION_REQUIRED", "Authentication is required.");
  try {
    const identity = await authenticateCognitoIdentity(token);
    const principal = await mapIdentityToPrincipal(identity, id);
    await recordAudit(getPostgresDb(), { actorId: principal.id, action: "authentication.success", resourceType: "user", resourceId: principal.id, outcome: "success", requestId: id, reason: "cognito-access-token" });
    return { principal, correlationId: id };
  } catch {
    throw new ApiError(401, "INVALID_AUTHENTICATION", "Authentication could not be verified.");
  }
}

export function readCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  const value = header.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);
  if (!value) return undefined;
  try { return decodeURIComponent(value); } catch { return undefined; }
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  let value: unknown;
  try { value = await request.json(); } catch { throw new ApiError(400, "INVALID_JSON", "The request body must be valid JSON."); }
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new ApiError(400, "INVALID_REQUEST", "The request body is invalid.");
  return value as Record<string, unknown>;
}
