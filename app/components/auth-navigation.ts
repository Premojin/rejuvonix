export function safeReturnPath(value: string | null | undefined): string | undefined {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || value.includes("://")) return undefined;
  return value;
}

export function rememberReturnPath(value: string | null | undefined): void {
  const path = safeReturnPath(value);
  if (path) window.sessionStorage.setItem("rejuvonix_auth_return_to", path);
  else window.sessionStorage.removeItem("rejuvonix_auth_return_to");
}

export function consumeReturnPath(): string | undefined {
  const value = window.sessionStorage.getItem("rejuvonix_auth_return_to");
  window.sessionStorage.removeItem("rejuvonix_auth_return_to");
  return safeReturnPath(value);
}
