import { createRemoteJWKSet, jwtVerify } from "jose";
import type { Role, Principal } from "./authorization";

const roleNames = new Set<Role>(["Patient", "Clinician", "Administrator", "Operations", "Support", "Service"]);

export interface CognitoIdentity {
  subject: string;
  email?: string;
  username?: string;
  groups: readonly Role[];
  tenantId: string;
}

let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;
let jwksIssuer: string | undefined;

function getVerifierConfig() {
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.AUTH_CLIENT_ID;
  const region = process.env.COGNITO_REGION ?? "us-east-1";
  const issuer = process.env.AUTH_ISSUER_URL ?? `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
  if (!userPoolId || !clientId) throw new Error("Cognito configuration is required for authenticated clinical APIs");
  return { clientId, issuer };
}

function getJwks(issuer: string) {
  if (!jwks || jwksIssuer !== issuer) {
    jwks = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));
    jwksIssuer = issuer;
  }
  return jwks;
}

export async function authenticateCognitoIdentity(token: string): Promise<CognitoIdentity> {
  if (!token || token.split(".").length !== 3) throw new Error("Invalid bearer token");
  const { clientId, issuer } = getVerifierConfig();
  const { payload } = await jwtVerify(token, getJwks(issuer), { issuer });
  if (payload.token_use !== "access") throw new Error("Cognito access token required");
  if (payload.client_id !== clientId) throw new Error("Cognito client mismatch");
  if (typeof payload.sub !== "string" || payload.sub.length === 0) throw new Error("Cognito subject required");
  const groups = Array.isArray(payload["cognito:groups"])
    ? payload["cognito:groups"].filter((group): group is Role => typeof group === "string" && roleNames.has(group as Role))
    : [];
  return {
    subject: payload.sub,
    email: typeof payload.email === "string" ? payload.email : undefined,
    username: typeof payload.username === "string" ? payload.username : undefined,
    groups,
    tenantId: typeof payload["custom:tenant_id"] === "string" ? payload["custom:tenant_id"] : process.env.APP_ENV ?? "local",
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
