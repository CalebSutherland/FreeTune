import db from "../config/db";

export async function insert(email: string, password: string) {
  const user = await db.one(
    `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, password_hash;
    `,
    [email, password]
  );

  await db.none(
    `
    INSERT INTO user_settings (user_id)
    VALUES ($1);
    `,
    [user.id]
  );
  return user;
}

export async function insertOAuthUser(
  email: string,
  provider: string,
  providerId: string
) {
  const user = await db.one(
    `
    INSERT INTO users (email, provider, provider_id)
    VALUES ($1, $2, $3)
    ON CONFLICT (provider, provider_id) DO UPDATE SET email = EXCLUDED.email
    RETURNING id, email;
    `,
    [email, provider, providerId]
  );

  await db.none(
    `
    INSERT INTO user_settings (user_id)
    VALUES ($1);
    `,
    [user.id]
  );

  return user;
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
