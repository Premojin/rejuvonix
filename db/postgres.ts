import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { clinicalSchema } from "./postgres-schema";

let pool: Pool | undefined;

export function getPostgresDb(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl) throw new Error("DATABASE_URL is required for the PostgreSQL runtime adapter");
  pool ??= new Pool({
    connectionString: databaseUrl,
    max: Number(process.env.DB_POOL_MAX ?? 5),
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : undefined,
  });
  return drizzle(pool, { schema: clinicalSchema });
}

export async function closePostgresPool() {
  if (pool) await pool.end();
  pool = undefined;
}
