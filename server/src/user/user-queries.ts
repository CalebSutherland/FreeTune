import db from "../config/db";

export async function insert(username: string, password: string) {
  const result = await db.one(
    `
    INSERT INTO users 
    (
      username, password_hash, instrument_family_index, instrument_index, 
      tuning_name, tuning_notes, visual
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, username, password_hash;
    `,
    [
      username,
      password,
      0,
      0,
      "standard",
      ["E2", "A2", "D3", "G3", "B3", "E4"],
      "graph",
    ]
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
