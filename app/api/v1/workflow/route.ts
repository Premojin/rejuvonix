import { containsClinicalPayload, getClinicalDataProvider } from "../../../clinical/provider";
import { ApiError, errorResponse, json, readJson, requirePrincipal } from "../_lib/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { principal, correlationId } = await requirePrincipal(request);
    const body = await readJson(request);
    if (containsClinicalPayload(body)) {
      throw new ApiError(400, "CLINICAL_DATA_NOT_ACCEPTED", "Clinical information must be collected by the approved external provider.");
    }
    const reference = await getClinicalDataProvider().beginClinicalIntake({ patientReference: principal.id, correlationId });
    return json({ data: reference }, 202, correlationId);
  } catch (error) { return errorResponse(error, id); }
}
