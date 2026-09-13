import { timingSafeEqual } from "node:crypto";
import { errorResponse, json, readCookie, readJson, ApiError } from "../../_lib/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const correlationId = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const body = await readJson(request);
    if (typeof body.code !== "string" || body.code.length < 10 || body.code.length > 4096 || typeof body.state !== "string" || body.state.length < 20 || body.state.length > 256) throw new ApiError(400, "INVALID_REQUEST", "Authentication response is invalid.");
    const expectedState = readCookie(request.headers.get("cookie"), "rejuvonix_oauth_state");
    const suppliedState = Buffer.from(body.state);
    const storedState = expectedState ? Buffer.from(expectedState) : Buffer.alloc(0);
    if (suppliedState.length !== storedState.length || !timingSafeEqual(suppliedState, storedState)) throw new ApiError(401, "AUTHENTICATION_FAILED", "Authentication could not be completed.");
    const domain = process.env.COGNITO_DOMAIN;
    const clientId = process.env.AUTH_CLIENT_ID;
    const redirectUri = process.env.AUTH_REDIRECT_URI ?? "https://staging.rejuvonix.com/auth/callback";
    if (!domain || !clientId) throw new ApiError(503, "AUTH_NOT_CONFIGURED", "Authentication is not configured for this environment.");
    const tokenResponse = await fetch(`https://${domain}/oauth2/token`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "authorization_code", client_id: clientId, code: body.code, redirect_uri: redirectUri }) });
    if (!tokenResponse.ok) throw new ApiError(401, "AUTHENTICATION_FAILED", "Authentication could not be completed.");
    const tokens = await tokenResponse.json() as { access_token?: string; expires_in?: number };
    if (!tokens.access_token) throw new ApiError(401, "AUTHENTICATION_FAILED", "Authentication could not be completed.");
    const response = json({ data: { authenticated: true } }, 200, correlationId);
    const csrfToken = crypto.randomUUID();
    response.headers.append("Set-Cookie", `rejuvonix_access_token=${encodeURIComponent(tokens.access_token)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${Math.min(tokens.expires_in ?? 3600, 3600)}`);
    response.headers.append("Set-Cookie", `rejuvonix_csrf=${csrfToken}; Secure; SameSite=Lax; Path=/; Max-Age=${Math.min(tokens.expires_in ?? 3600, 3600)}`);
    response.headers.append("Set-Cookie", "rejuvonix_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0");
    return response;
  } catch (error) { return errorResponse(error, correlationId); }
}
