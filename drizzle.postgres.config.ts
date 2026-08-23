import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/postgres",
  schema: "./db/postgres-schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "postgresql://synthetic@localhost/rejuvonix" },
});
