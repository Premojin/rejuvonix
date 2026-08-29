INSERT INTO "roles" ("id", "name", "scope") VALUES
  ('00000000-0000-0000-0000-000000000001', 'Patient', 'own'),
  ('00000000-0000-0000-0000-000000000002', 'Clinician', 'assigned-patient'),
  ('00000000-0000-0000-0000-000000000003', 'Administrator', 'administrative'),
  ('00000000-0000-0000-0000-000000000004', 'Operations', 'administrative'),
  ('00000000-0000-0000-0000-000000000005', 'Support', 'support-limited'),
  ('00000000-0000-0000-0000-000000000006', 'Service', 'system')
ON CONFLICT ("name") DO UPDATE SET "scope" = EXCLUDED."scope", "updated_at" = now();

INSERT INTO "permissions" ("id", "name") VALUES
  ('00000000-0000-0000-0001-000000000001', 'patient:read-own'),
  ('00000000-0000-0000-0001-000000000002', 'patient:update-own'),
  ('00000000-0000-0000-0001-000000000003', 'consent:manage-own'),
  ('00000000-0000-0000-0001-000000000004', 'appointment:request-own'),
  ('00000000-0000-0000-0001-000000000005', 'patient:read-assigned'),
  ('00000000-0000-0000-0001-000000000006', 'appointment:manage'),
  ('00000000-0000-0000-0001-000000000007', 'administration:manage')
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "role_permissions" ("role_id", "permission_id")
SELECT role_map.id, permission_map.id
FROM (VALUES
  ('Patient', 'patient:read-own'),
  ('Patient', 'patient:update-own'),
  ('Patient', 'consent:manage-own'),
  ('Patient', 'appointment:request-own'),
  ('Clinician', 'patient:read-assigned'),
  ('Clinician', 'appointment:manage'),
  ('Administrator', 'administration:manage'),
  ('Operations', 'appointment:manage')
) AS mapping(role_name, permission_name)
JOIN "roles" role_map ON role_map."name" = mapping.role_name
JOIN "permissions" permission_map ON permission_map."name" = mapping.permission_name
ON CONFLICT DO NOTHING;
