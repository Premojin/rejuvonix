import {clinicalDataProvider} from "../../../integrations/clinical-data-provider";
import {intakePrograms} from "../../../lib/intake-contract";

export const dynamic = "force-dynamic";

function localOnly(): Response | null {
  const localRuntime = process.env.APP_ENV === "local"
    || process.env.NODE_ENV === "development"
    || import.meta.env?.DEV === true;
  return localRuntime
    ? null
    : Response.json({error: {code: "INTEGRATION_NOT_CONFIGURED", message: "Clinical workflow integration is not configured."}}, {status: 503});
}

export async function POST(request: Request): Promise<Response> {
  const unavailable = localOnly();
  if (unavailable) return unavailable;
  try {
    const body = await request.json() as Record<string, unknown>;
    if (Object.keys(body).some((key) => key !== "patientId" && key !== "program" && key !== "requestId")) {
      return Response.json({error: {code: "INVALID_REQUEST", message: "Clinical payloads are not accepted by this local boundary."}}, {status: 400});
    }
    const patientId = typeof body.patientId === "string" ? body.patientId : "";
    const program = typeof body.program === "string" && intakePrograms.includes(body.program as typeof intakePrograms[number])
      ? body.program as typeof intakePrograms[number]
      : null;
    const requestId = typeof body.requestId === "string" ? body.requestId : "";
    if (!program || !patientId || !requestId) {
      return Response.json({error: {code: "INVALID_REQUEST", message: "A local patient reference, program, and request ID are required."}}, {status: 400});
    }
    const result = await clinicalDataProvider.beginClinicalIntake({patientId, program, requestId});
    return Response.json({data: result});
  } catch {
    return Response.json({error: {code: "INVALID_REQUEST", message: "The local workflow request could not be processed."}}, {status: 400});
  }
}
