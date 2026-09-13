const AUTH_HOSTS = new Map([
  ["rejuvonix.com", "https://rejuvonix.com"],
  ["staging.rejuvonix.com", "https://staging.rejuvonix.com"],
  ["localhost:5173", "http://localhost:5173"],
]);

function authOrigin(request) {
  const requestUrl = new URL(request.url);
  const origin = AUTH_HOSTS.get(requestUrl.host.toLowerCase());
  if (origin) return origin;

  const configuredOrigin = process.env.APP_BASE_URL?.trim().replace(/\/$/, "");
  if (configuredOrigin) return configuredOrigin;

  throw new Error("Authentication host is not configured");
}

export function getAuthRedirectUri(request) {
  return `${authOrigin(request)}/auth/callback`;
}

export function getAuthLogoutUri(request) {
  return `${authOrigin(request)}/`;
}
