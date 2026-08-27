import { and, eq } from "drizzle-orm";
import { getPostgresDb } from "../../../../../../db/postgres";
import { appointments, clinicians, patients, patientProfiles } from "../../../../../../db/postgres-schema";
import { recordAccess } from "../../../../../../app/clinical/events";
import { errorResponse, json, requirePrincipal, ApiError } from "../../../_lib/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ patientId: string }> }): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { patientId } = await context.params;
    const { principal, correlationId } = await requirePrincipal(request);
    if (!principal.roles.includes("Clinician")) throw new ApiError(403, "FORBIDDEN", "Clinician authorization is required.");
    const db = getPostgresDb();
    const [clinician] = await db.select().from(clinicians).where(eq(clinicians.userId, principal.id));
    if (!clinician) throw new ApiError(403, "FORBIDDEN", "Clinician assignment is not provisioned.");
    const [row] = await db.select({ patient: patients, profile: patientProfiles }).from(appointments).innerJoin(patients, eq(patients.id, appointments.patientId)).leftJoin(patientProfiles, eq(patientProfiles.patientId, patients.id)).where(and(eq(appointments.patientId, patientId), eq(appointments.clinicianId, clinician.id)));
    if (!row) throw new ApiError(404, "RESOURCE_NOT_FOUND", "The requested resource was not found.");
    await recordAccess(db, { actorId: principal.id, patientId, action: "read", outcome: "success", requestId: correlationId, reason: "assigned-clinician" });
    return json({ data: { ...row.patient, profile: row.profile } }, 200, correlationId);
  } catch (error) { return errorResponse(error, id); }
}
