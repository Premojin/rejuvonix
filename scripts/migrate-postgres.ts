import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "node:path";
import { getPostgresDb, closePostgresPool } from "../db/postgres.ts";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required; refusing to run migrations");
if (process.env.REJUVONIX_MIGRATION_CONFIRMATION !== "APPROVED_NON_PROD_MIGRATION") {
  throw new Error("Migration execution requires explicit non-production approval; refusing to run");
}

const migrationsFolder = process.env.REJUVONIX_MIGRATIONS_FOLDER ?? "./drizzle/postgres-baseline";
if (path.resolve(migrationsFolder) === path.resolve("./drizzle/postgres")) {
  throw new Error("Historical migrations are superseded; refusing to run ./drizzle/postgres");
}

try {
  await migrate(getPostgresDb(databaseUrl), { migrationsFolder });
  console.log("PostgreSQL migrations applied");
} finally {
  await closePostgresPool();
}
