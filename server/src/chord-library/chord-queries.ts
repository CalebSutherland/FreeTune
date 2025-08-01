import db from "../config/db";

export async function insertDefaultChordSettings(userId: number) {
  return await db.none(`INSERT INTO chord_library (user_id) VALUES ($1)`, [
    userId,
  ]);
}
