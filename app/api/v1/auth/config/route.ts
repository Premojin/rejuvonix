import { json } from "../../_lib/http";

export const dynamic = "force-dynamic";

export function GET(): Response {
  const domain = process.env.COGNITO_DOMAIN;
  const clientId = process.env.AUTH_CLIENT_ID;
  if (!domain || !clientId) return json({ error: { code: "AUTH_NOT_CONFIGURED", message: "Authentication is not configured for this environment." } }, 503);
  const state = crypto.randomUUID();
  const response = json({ data: { domain, clientId, state, authorizationEndpoint: `https://${domain}/oauth2/authorize`, logoutEndpoint: `https://${domain}/logout`, redirectUri: process.env.AUTH_REDIRECT_URI ?? "https://staging.rejuvonix.com/auth/callback" } });
  response.headers.append("Set-Cookie", `rejuvonix_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`);
  return response;
}
