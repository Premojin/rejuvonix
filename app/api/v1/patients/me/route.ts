import { eq } from "drizzle-orm";
import { getPostgresDb } from "../../../../../db/postgres";
import { patientProfiles, patients } from "../../../../../db/postgres-schema";
import { authorize } from "../../../../../app/clinical/authorization";
import { errorResponse, json, readJson, requirePrincipal, ApiError } from "../../_lib/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { principal, correlationId } = await requirePrincipal(request);
    const db = getPostgresDb();
    const [patient] = await db.select().from(patients).where(eq(patients.userId, principal.id));
    if (!patient) throw new ApiError(404, "RESOURCE_NOT_FOUND", "The requested resource was not found.");
    const decision = authorize(principal, { action: "read", scope: "own", resource: { type: "patient", id: patient.id, ownerId: principal.id, tenantId: principal.tenantId } });
    if (!decision.allowed) throw new ApiError(403, "FORBIDDEN", "You are not authorized to access this resource.");
    const [profile] = await db.select().from(patientProfiles).where(eq(patientProfiles.patientId, patient.id));
    return json({ data: { id: patient.id, status: patient.status, profile: profile ?? null } }, 200, correlationId);
  } catch (error) { return errorResponse(error, id); }
}

export async function PATCH(request: Request): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { principal, correlationId } = await requirePrincipal(request);
    const body = await readJson(request);
    const displayName = body.displayName;
    const preferredContactMethod = body.preferredContactMethod;
    if (typeof displayName !== "string" || displayName.trim().length < 1 || displayName.length > 120 || (preferredContactMethod !== undefined && typeof preferredContactMethod !== "string")) {
      throw new ApiError(400, "INVALID_REQUEST", "Profile fields are invalid.");
    }
    const db = getPostgresDb();
    const [patient] = await db.select().from(patients).where(eq(patients.userId, principal.id));
    if (!patient) throw new ApiError(404, "RESOURCE_NOT_FOUND", "The requested resource was not found.");
    const decision = authorize(principal, { action: "update", scope: "own", resource: { type: "patient-profile", id: patient.id, ownerId: principal.id, tenantId: principal.tenantId } });
    if (!decision.allowed) throw new ApiError(403, "FORBIDDEN", "You are not authorized to update this resource.");
    const [profile] = await db.insert(patientProfiles).values({ patientId: patient.id, displayName: displayName.trim(), preferredContactMethod: preferredContactMethod as string | undefined }).onConflictDoUpdate({ target: patientProfiles.patientId, set: { displayName: displayName.trim(), preferredContactMethod: preferredContactMethod as string | undefined, updatedAt: new Date() } }).returning();
    return json({ data: profile }, 200, correlationId);
  } catch (error) { return errorResponse(error, id); }
}
