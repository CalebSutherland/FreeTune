import db from "../config/db";

export async function insert(username: string, password: string) {
  const result = await db.one(
    `
    INSERT INTO users (username, password_hash, tuning_notes)
    VALUES ($1, $2, $3)
    RETURNING id, username, password_hash;
    `,
    [username, password, ["E2", "A2", "D3", "G3", "B3", "E4"]]
  );
  return result;
}

export async function getByUsername(username: string) {
  const result = await db.oneOrNone(
    `
    SELECT id, username, password_hash
    FROM users
    WHERE username = $1
    `,
    [username]
  );
  return result;
}
