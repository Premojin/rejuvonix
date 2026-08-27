import { migrate } from "drizzle-orm/node-postgres/migrator";
import { getPostgresDb, closePostgresPool } from "../db/postgres";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required; refusing to run migrations");
if (process.env.REJUVONIX_MIGRATION_CONFIRMATION !== "APPROVED_NON_PROD_MIGRATION") {
  throw new Error("Migration execution requires explicit non-production approval; refusing to run");
}

try {
  await migrate(getPostgresDb(databaseUrl), { migrationsFolder: "./drizzle/postgres" });
  console.log("PostgreSQL migrations applied");
} finally {
  await closePostgresPool();
}
