import { ApiError, errorResponse, json, readJson } from "../../_lib/http";

export const dynamic = "force-dynamic";
type SignupBody = { firstName?: unknown; lastName?: unknown; email?: unknown; phoneNumber?: unknown; password?: unknown };
const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
function providerMessage(name: string | undefined): string {
  if (name === "InvalidPasswordException") return "Choose a password that meets the requirements and try again.";
  if (name === "InvalidParameterException") return "Check the information entered and try again.";
  if (name === "TooManyRequestsException" || name === "LimitExceededException") return "Too many attempts. Please wait a moment and try again.";
  return "We couldn't create the account right now. Please try again.";
}
export async function POST(request: Request): Promise<Response> {
  const correlationId = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const body = await readJson(request) as SignupBody;
    const firstName = text(body.firstName); const lastName = text(body.lastName); const email = text(body.email); const phoneNumber = text(body.phoneNumber); const password = typeof body.password === "string" ? body.password : "";
    const clientId = process.env.AUTH_CLIENT_ID; const region = process.env.COGNITO_REGION ?? "us-east-1";
    if (!clientId) throw new ApiError(503, "AUTH_NOT_CONFIGURED", "Secure account creation is not available in this environment.");
    if (!firstName || !lastName || !/^\S+@\S+\.\S+$/.test(email) || !/^\+[1-9]\d{7,14}$/.test(phoneNumber) || !password) throw new ApiError(400, "INVALID_SIGNUP", "Check the required account fields and try again.");
    const response = await fetch(`https://cognito-idp.${region}.amazonaws.com/`, { method: "POST", headers: { "content-type": "application/x-amz-json-1.1", "x-amz-target": "AWSCognitoIdentityProviderService.SignUp" }, body: JSON.stringify({ ClientId: clientId, Username: email, Password: password, UserAttributes: [{ Name: "given_name", Value: firstName }, { Name: "family_name", Value: lastName }, { Name: "email", Value: email }, { Name: "phone_number", Value: phoneNumber }] }) });
    if (!response.ok) {
      const provider = await response.json().catch(() => ({})) as { __type?: string; code?: string };
      const name = (provider.__type ?? provider.code ?? "").split("#").pop();
      if (name === "UsernameExistsException") return json({ data: { accepted: true, verificationRequired: true, message: "If an account can be created with these details, verification instructions will be available through Cognito." } }, 200, correlationId);
      throw new ApiError(400, "SIGNUP_FAILED", providerMessage(name));
    }
    const result = await response.json() as { UserConfirmed?: boolean; CodeDeliveryDetails?: { DeliveryMedium?: string } };
    return json({ data: { accepted: true, verificationRequired: result.UserConfirmed !== true, deliveryMedium: result.CodeDeliveryDetails?.DeliveryMedium === "PHONE" ? "phone" : "email" } }, 200, correlationId);
  } catch (error) { return errorResponse(error, correlationId); }
}
