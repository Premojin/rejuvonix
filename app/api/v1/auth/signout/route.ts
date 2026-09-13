import { json, readCookie } from "../../_lib/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  const cookieHeader = request.headers.get("cookie");
  const csrfCookie = readCookie(cookieHeader, "rejuvonix_csrf");
  const csrfHeader = request.headers.get("x-csrf-token");
  if (readCookie(cookieHeader, "rejuvonix_access_token") && (!csrfCookie || csrfCookie !== csrfHeader)) {
    return Response.json({ error: { code: "CSRF_VALIDATION_FAILED", message: "The request could not be validated.", correlationId: id } }, { status: 403, headers: { "X-Correlation-Id": id } });
  }
  const response = json({ data: { signedOut: true } }, 200, id);
  response.headers.append("Set-Cookie", "rejuvonix_access_token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0");
  response.headers.append("Set-Cookie", "rejuvonix_csrf=; Secure; SameSite=Lax; Path=/; Max-Age=0");
  return response;
}
