import { eq } from "drizzle-orm";
import { getPostgresDb } from "../../../../../db/postgres";
import { appointments, clinicians, patients, patientProfiles } from "../../../../../db/postgres-schema";
import { errorResponse, json, requirePrincipal, ApiError } from "../../_lib/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { principal, correlationId } = await requirePrincipal(request);
    if (!principal.roles.includes("Clinician")) throw new ApiError(403, "FORBIDDEN", "Clinician authorization is required.");
    const db = getPostgresDb();
    const [clinician] = await db.select().from(clinicians).where(eq(clinicians.userId, principal.id));
    if (!clinician) throw new ApiError(403, "FORBIDDEN", "Clinician assignment is not provisioned.");
    const rows = await db.select({ patient: patients, profile: patientProfiles, appointment: appointments }).from(appointments).innerJoin(patients, eq(patients.id, appointments.patientId)).leftJoin(patientProfiles, eq(patientProfiles.patientId, patients.id)).where(eq(appointments.clinicianId, clinician.id));
    return json({ data: rows.map((row) => ({ ...row.patient, profile: row.profile, appointment: row.appointment })) }, 200, correlationId);
  } catch (error) { return errorResponse(error, id); }
}
