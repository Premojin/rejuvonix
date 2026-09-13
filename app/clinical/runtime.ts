import { and, eq } from "drizzle-orm";
import type { CognitoIdentity } from "./authentication";
import type { Principal, Role, Scope } from "./authorization";
import { getPostgresDb } from "../../db/postgres";
import { roles, userRoles, users } from "../../db/postgres-schema";

const validRoles = new Set<Role>(["Patient", "Clinician", "Administrator", "Operations", "Support", "Service"]);
const validScopes = new Set<Scope>(["own", "assigned-patient", "care-team", "administrative", "support-limited", "system"]);

export async function mapIdentityToPrincipal(identity: CognitoIdentity, correlationId?: string): Promise<Principal> {
  const db = getPostgresDb();
  const rows = await db
    .select({ user: users, role: roles })
    .from(users)
    .leftJoin(userRoles, eq(userRoles.userId, users.id))
    .leftJoin(roles, eq(roles.id, userRoles.roleId))
    .where(and(eq(users.externalSubject, identity.subject), eq(users.status, "active")));

  const first = rows[0];
  if (!first) throw new Error("Application identity is not provisioned");
  const mappedRoles = rows.map((row) => row.role?.name).filter((role): role is Role => validRoles.has(role as Role));
  const scopes = rows.map((row) => row.role?.scope).filter((scope): scope is Scope => validScopes.has(scope as Scope));
  return {
    id: first.user.id,
    identitySubject: identity.subject,
    roles: [...new Set(mappedRoles)],
    scopes: [...new Set(scopes)],
    permissions: [],
    active: true,
    tenantId: first.user.tenantId,
    correlationId,
  };
}

export function syntheticPrincipal(input: Pick<Principal, "id" | "roles"> & Partial<Principal>): Principal {
  return { active: true, ...input };
}
