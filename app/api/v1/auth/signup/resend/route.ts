import { ApiError, errorResponse, json, readJson } from "../../../_lib/http";

export const dynamic = "force-dynamic";
export async function POST(request: Request): Promise<Response> {
  const correlationId = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const body = await readJson(request) as { email?: unknown }; const email = typeof body.email === "string" ? body.email.trim() : ""; const clientId = process.env.AUTH_CLIENT_ID; const region = process.env.COGNITO_REGION ?? "us-east-1";
    if (!clientId) throw new ApiError(503, "AUTH_NOT_CONFIGURED", "Account verification is not available in this environment.");
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new ApiError(400, "INVALID_VERIFICATION", "Enter a valid account email address.");
    const response = await fetch(`https://cognito-idp.${region}.amazonaws.com/`, { method: "POST", headers: { "content-type": "application/x-amz-json-1.1", "x-amz-target": "AWSCognitoIdentityProviderService.ResendConfirmationCode" }, body: JSON.stringify({ ClientId: clientId, Username: email }) });
    if (!response.ok) throw new ApiError(400, "VERIFICATION_RESEND_FAILED", "We couldn't send a new code right now. Please wait and try again.");
    return json({ data: { sent: true } }, 200, correlationId);
  } catch (error) { return errorResponse(error, correlationId); }
}
