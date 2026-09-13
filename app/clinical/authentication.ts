import { CognitoJwtVerifier } from "aws-jwt-verify";
import type { Role, Principal } from "./authorization";

const roleNames = new Set<Role>([
  "Patient",
  "Clinician",
  "Administrator",
  "Operations",
  "Support",
  "Service",
]);

export interface CognitoIdentity {
  subject: string;
  email?: string;
  username?: string;
  groups: readonly Role[];
  tenantId: string;
}

let verifier: ReturnType<typeof CognitoJwtVerifier.create> | undefined;

function getVerifier() {
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.AUTH_CLIENT_ID;
  if (!userPoolId || !clientId) {
    throw new Error("Cognito configuration is required for authenticated clinical APIs");
  }
  verifier ??= CognitoJwtVerifier.create({
    userPoolId,
    tokenUse: "access",
    clientId,
  });
  return verifier;
}

export async function authenticateCognitoIdentity(token: string): Promise<CognitoIdentity> {
  if (!token || token.split(".").length !== 3) throw new Error("Invalid bearer token");
  const claims = await getVerifier().verify(token);
  const roles = (claims["cognito:groups"] ?? []).filter((group): group is Role => roleNames.has(group as Role));
  return {
    subject: claims.sub,
    email: typeof claims.email === "string" ? claims.email : undefined,
    username: typeof claims.username === "string" ? claims.username : undefined,
    groups: roles,
    tenantId: typeof claims["custom:tenant_id"] === "string"
      ? claims["custom:tenant_id"]
      : process.env.APP_ENV ?? "local",
  };
}

/** @deprecated Use identity verification followed by local principal mapping. */
export async function authenticateCognitoBearerToken(token: string): Promise<Principal> {
  const identity = await authenticateCognitoIdentity(token);
  return { id: identity.subject, identitySubject: identity.subject, roles: identity.groups, active: true, tenantId: identity.tenantId };
}

export function readBearerToken(authorization: string | null): string | undefined {
  if (!authorization) return undefined;
  const match = /^Bearer\s+([^\s]+)$/i.exec(authorization);
  return match?.[1];
}
