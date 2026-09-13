export type Role =
  | "Patient"
  | "Clinician"
  | "Administrator"
  | "Operations"
  | "Support"
  | "Service";

export type Scope =
  | "own"
  | "assigned-patient"
  | "care-team"
  | "administrative"
  | "support-limited"
  | "system";

export type ResourceType =
  | "user"
  | "patient"
  | "patient-profile"
  | "consent"
  | "appointment"
  | "encounter"
  | "treatment-plan"
  | "audit-event"
  | "access-event"
  | "security-event"
  | "administrative";

export interface Principal {
  id: string;
  identitySubject?: string;
  roles: readonly Role[];
  permissions?: readonly string[];
  scopes?: readonly Scope[];
  active: boolean;
  tenantId?: string;
  correlationId?: string;
}

export interface ResourceSubject {
  type: ResourceType;
  id: string;
  ownerId?: string;
  assignedClinicianIds?: readonly string[];
  tenantId?: string;
}

export interface AuthorizationRequest {
  action: "read" | "create" | "update" | "revoke" | "assign" | "break-glass";
  resource: ResourceSubject;
  scope: Scope;
  reason?: string;
}

export interface AuthorizationDecision {
  allowed: boolean;
  reason: string;
}

const clinicalResources = new Set<ResourceType>([
  "patient",
  "patient-profile",
  "consent",
  "appointment",
  "encounter",
  "treatment-plan",
]);

export function authorize(
  principal: Principal,
  request: AuthorizationRequest,
): AuthorizationDecision {
  if (!principal.active) return { allowed: false, reason: "inactive-principal" };
  if (!principal.roles.length) return { allowed: false, reason: "no-role" };
  if (principal.tenantId && request.resource.tenantId && principal.tenantId !== request.resource.tenantId) {
    return { allowed: false, reason: "tenant-boundary" };
  }

  if (request.action === "break-glass") {
    const privileged = principal.roles.includes("Clinician") || principal.roles.includes("Administrator");
    return privileged && Boolean(request.reason?.trim())
      ? { allowed: true, reason: "break-glass-reason-recorded" }
      : { allowed: false, reason: "break-glass-requires-privileged-role-and-reason" };
  }

  if (principal.roles.includes("Service") && request.scope === "system") {
    return { allowed: true, reason: "service-system-scope" };
  }

  if (principal.roles.includes("Patient") && request.scope === "own") {
    return request.resource.ownerId === principal.id &&
      (request.action === "read" || request.action === "update" || request.action === "create" || request.action === "revoke")
      ? { allowed: true, reason: "patient-own-resource" }
      : { allowed: false, reason: "patient-own-resource-only" };
  }

  if (principal.roles.includes("Clinician") && clinicalResources.has(request.resource.type)) {
    const assigned = request.resource.assignedClinicianIds?.includes(principal.id) ?? false;
    return assigned && (request.scope === "assigned-patient" || request.scope === "care-team")
      ? { allowed: true, reason: "assigned-clinical-resource" }
      : { allowed: false, reason: "clinician-assignment-required" };
  }

  if (principal.roles.includes("Support") && request.scope === "support-limited") {
    const metadataOnly = request.resource.type === "user" || request.resource.type === "appointment";
    return metadataOnly && request.action === "read"
      ? { allowed: true, reason: "support-limited-metadata" }
      : { allowed: false, reason: "support-clinical-content-denied" };
  }

  if (principal.roles.includes("Administrator") && request.scope === "administrative") {
    return request.resource.type === "administrative" || request.resource.type === "user"
      ? { allowed: true, reason: "administrative-resource" }
      : { allowed: false, reason: "administrator-clinical-access-not-implied" };
  }

  if (principal.roles.includes("Operations") && request.scope === "administrative") {
    return request.resource.type === "appointment" && request.action !== "read"
      ? { allowed: true, reason: "operations-scheduling" }
      : { allowed: false, reason: "operations-scope-limited" };
  }

  return { allowed: false, reason: "default-deny" };
}
