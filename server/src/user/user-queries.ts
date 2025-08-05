import db from "../config/db";

const DEFAULT_NOTES = ["E2", "A2", "D3", "G3", "B3", "E4"];

export async function insert(email: string, password: string) {
  const result = await db.one(
    `
    INSERT INTO users (email, password_hash, tuning_notes)
    VALUES ($1, $2, $3)
    RETURNING id, email, password_hash;
    `,
    [email, password, DEFAULT_NOTES]
  );
  return result;
}

export async function insertOAuthUser(
  email: string,
  provider: string,
  providerId: string
) {
  const result = await db.one(
    `
    INSERT INTO users (email, provider, provider_id, tuning_notes)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (provider, provider_id) DO UPDATE SET email = EXCLUDED.email
    RETURNING id, email;
    `,
    [email, provider, providerId, DEFAULT_NOTES]
  );
  return result;
}

export async function getByEmail(email: string) {
  const result = await db.oneOrNone(
    `
    SELECT id, email, password_hash
    FROM users
    WHERE email = $1
    `,
    [email]
  );
  return result;
}

export async function getById(id: number) {
  const result = await db.oneOrNone(
    `
    SELECT id, email
    FROM users
    WHERE id = $1
    `,
    [id]
  );
  return result;
}

export async function getByOAuth(provider: string, providerId: string) {
  const result = await db.oneOrNone(
    `
    SELECT id, email
    FROM users
    WHERE provider = $1 AND provider_id = $2
    `,
    [provider, providerId]
  );
  return result;
}
