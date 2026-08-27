import { desc, eq } from "drizzle-orm";
import { getPostgresDb } from "../../../../db/postgres";
import { consents, patients } from "../../../../db/postgres-schema";
import { errorResponse, json, readJson, requirePrincipal, ApiError } from "../_lib/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { principal, correlationId } = await requirePrincipal(request);
    const db = getPostgresDb();
    const [patient] = await db.select().from(patients).where(eq(patients.userId, principal.id));
    if (!patient) throw new ApiError(404, "RESOURCE_NOT_FOUND", "The requested resource was not found.");
    const rows = await db.select().from(consents).where(eq(consents.patientId, patient.id)).orderBy(desc(consents.createdAt));
    return json({ data: rows }, 200, correlationId);
  } catch (error) { return errorResponse(error, id); }
}

export async function POST(request: Request): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { principal, correlationId } = await requirePrincipal(request);
    const body = await readJson(request);
    if (![body.consentType, body.version].every((value) => typeof value === "string" && value.trim().length > 0 && value.length <= 100)) throw new ApiError(400, "INVALID_REQUEST", "Consent type and version are required.");
    const db = getPostgresDb();
    const [patient] = await db.select().from(patients).where(eq(patients.userId, principal.id));
    if (!patient) throw new ApiError(404, "RESOURCE_NOT_FOUND", "The requested resource was not found.");
    const [consent] = await db.insert(consents).values({ patientId: patient.id, consentType: body.consentType as string, version: body.version as string, status: "granted", source: typeof body.source === "string" ? body.source : "patient-portal", grantedAt: new Date() }).returning();
    return json({ data: consent }, 201, correlationId);
  } catch (error) { return errorResponse(error, id); }
}
