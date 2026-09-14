import { ApiError, errorResponse, json, readJson } from "../../../_lib/http";

export const dynamic = "force-dynamic";
type ConfirmBody = { email?: unknown; code?: unknown };
const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
function safeMessage(name: string | undefined): string {
  if (name === "CodeMismatchException") return "That verification code does not match. Check the latest email and try again.";
  if (name === "ExpiredCodeException") return "That verification code has expired. Request a new code and try again.";
  if (name === "NotAuthorizedException") return "This account cannot be verified with that code. Request a new code or return to sign in.";
  return "We couldn't verify the account right now. Check the code and try again.";
}
export async function POST(request: Request): Promise<Response> {
  const correlationId = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const body = await readJson(request) as ConfirmBody; const email = text(body.email); const code = text(body.code); const clientId = process.env.AUTH_CLIENT_ID; const region = process.env.COGNITO_REGION ?? "us-east-1";
    if (!clientId) throw new ApiError(503, "AUTH_NOT_CONFIGURED", "Account verification is not available in this environment.");
    if (!/^\S+@\S+\.\S+$/.test(email) || !/^\d{4,8}$/.test(code)) throw new ApiError(400, "INVALID_VERIFICATION", "Enter the verification code from your latest Cognito email.");
    const response = await fetch(`https://cognito-idp.${region}.amazonaws.com/`, { method: "POST", headers: { "content-type": "application/x-amz-json-1.1", "x-amz-target": "AWSCognitoIdentityProviderService.ConfirmSignUp" }, body: JSON.stringify({ ClientId: clientId, Username: email, ConfirmationCode: code }) });
    if (!response.ok) { const provider = await response.json().catch(() => ({})) as { __type?: string; code?: string }; const name = (provider.__type ?? provider.code ?? "").split("#").pop(); throw new ApiError(400, "VERIFICATION_FAILED", safeMessage(name)); }
    return json({ data: { verified: true } }, 200, correlationId);
  } catch (error) { return errorResponse(error, correlationId); }
}
