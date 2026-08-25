/**
 * D1/SQLite is not an active Rejuvonix persistence target.
 *
 * Historical v82 intake tables remain in migration history for audit and
 * disposition purposes only. They are not exported as an application schema,
 * and they must not become a PHI system of record. Rejuvonix persistence uses
 * the governed PostgreSQL schema for non-PHI application data.
 */
export {};
