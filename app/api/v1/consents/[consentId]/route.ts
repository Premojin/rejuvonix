import { and, eq } from "drizzle-orm";
import { getPostgresDb } from "../../../../../db/postgres";
import { consents, patients } from "../../../../../db/postgres-schema";
import { errorResponse, json, requirePrincipal, ApiError } from "../../_lib/http";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request, context: { params: Promise<{ consentId: string }> }): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { consentId } = await context.params;
    const { principal, correlationId } = await requirePrincipal(request);
    const db = getPostgresDb();
    const [patient] = await db.select().from(patients).where(eq(patients.userId, principal.id));
    if (!patient) throw new ApiError(404, "RESOURCE_NOT_FOUND", "The requested resource was not found.");
    const [consent] = await db.select().from(consents).where(and(eq(consents.id, consentId), eq(consents.patientId, patient.id)));
    if (!consent) throw new ApiError(404, "RESOURCE_NOT_FOUND", "The requested resource was not found.");
    const [revoked] = await db.update(consents).set({ status: "revoked", revokedAt: new Date(), updatedAt: new Date() }).where(eq(consents.id, consentId)).returning();
    return json({ data: revoked }, 200, correlationId);
  } catch (error) { return errorResponse(error, id); }
}
