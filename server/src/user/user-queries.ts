import db from "../config/db";

export async function insert(email: string, password: string) {
  const result = await db.one(
    `
    INSERT INTO users (email, password_hash, tuning_notes)
    VALUES ($1, $2, $3)
    RETURNING id, email, password_hash;
    `,
    [email, password, ["E2", "A2", "D3", "G3", "B3", "E4"]]
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
