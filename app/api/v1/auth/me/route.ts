import {eq} from "drizzle-orm";
import {getPostgresDb} from "../../../../../db/postgres";
import {users} from "../../../../../db/postgres-schema";
import {ApiError, errorResponse, json, requirePrincipal} from "../../_lib/http";

export const dynamic = "force-dynamic";
export async function GET(request: Request): Promise<Response> { const correlationId = request.headers.get("x-correlation-id") ?? crypto.randomUUID(); try { const {principal} = await requirePrincipal(request); const [user] = await getPostgresDb().select({id: users.id, status: users.status, tenantId: users.tenantId}).from(users).where(eq(users.id, principal.id)); if (!user) throw new ApiError(404, "RESOURCE_NOT_FOUND", "The requested resource was not found."); return json({data: {id: user.id, status: user.status, roles: principal.roles, scopes: principal.scopes ?? [], tenantId: user.tenantId}}, 200, correlationId); } catch (error) { return errorResponse(error, correlationId); } }
