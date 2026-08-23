import { migrate } from "drizzle-orm/node-postgres/migrator";
import { getPostgresDb, closePostgresPool } from "../db/postgres";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required; refusing to run migrations");

try {
  await migrate(getPostgresDb(databaseUrl), { migrationsFolder: "./drizzle/postgres" });
  console.log("PostgreSQL migrations applied");
} finally {
  await closePostgresPool();
}
