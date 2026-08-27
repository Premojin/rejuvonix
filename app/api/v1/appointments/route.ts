import { asc, eq } from "drizzle-orm";
import { getPostgresDb } from "../../../../db/postgres";
import { appointments, patients } from "../../../../db/postgres-schema";
import { errorResponse, json, readJson, requirePrincipal, ApiError } from "../_lib/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { principal, correlationId } = await requirePrincipal(request);
    const db = getPostgresDb();
    const [patient] = await db.select().from(patients).where(eq(patients.userId, principal.id));
    if (!patient) throw new ApiError(404, "RESOURCE_NOT_FOUND", "The requested resource was not found.");
    const rows = await db.select().from(appointments).where(eq(appointments.patientId, patient.id)).orderBy(asc(appointments.scheduledAt));
    return json({ data: rows }, 200, correlationId);
  } catch (error) { return errorResponse(error, id); }
}

export async function POST(request: Request): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { principal, correlationId } = await requirePrincipal(request);
    const body = await readJson(request);
    const scheduledAt = body.scheduledAt === undefined ? null : new Date(String(body.scheduledAt));
    if (scheduledAt && Number.isNaN(scheduledAt.getTime())) throw new ApiError(400, "INVALID_REQUEST", "scheduledAt must be a valid date.");
    const db = getPostgresDb();
    const [patient] = await db.select().from(patients).where(eq(patients.userId, principal.id));
    if (!patient) throw new ApiError(404, "RESOURCE_NOT_FOUND", "The requested resource was not found.");
    const [appointment] = await db.insert(appointments).values({ patientId: patient.id, scheduledAt }).returning();
    return json({ data: appointment }, 201, correlationId);
  } catch (error) { return errorResponse(error, id); }
}
