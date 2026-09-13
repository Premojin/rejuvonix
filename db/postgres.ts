import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { clinicalSchema } from "./postgres-schema.ts";

let pool: Pool | undefined;

function resolveDatabaseUrl(databaseUrl = process.env.DATABASE_URL): string | undefined {
  if (databaseUrl) return databaseUrl;
  const { DB_HOST: host, DB_PORT: port = "5432", DB_NAME: database = "rejuvonix", DB_USER: user, DB_PASSWORD: password } = process.env;
  if (!host || !user || !password) return undefined;
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${encodeURIComponent(database)}`;
}

export function getPostgresDb(databaseUrl = process.env.DATABASE_URL) {
  const resolvedUrl = resolveDatabaseUrl(databaseUrl);
  if (!resolvedUrl) throw new Error("PostgreSQL runtime configuration is required");
  pool ??= new Pool({
    connectionString: resolvedUrl,
    max: Number(process.env.DB_POOL_MAX ?? 5),
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    query_timeout: 10000,
    ssl: process.env.DATABASE_SSL === "true" || process.env.APP_ENV === "staging" || process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : undefined,
  });
  return drizzle(pool, { schema: clinicalSchema });
}

export async function closePostgresPool() {
  if (pool) await pool.end();
  pool = undefined;
}
