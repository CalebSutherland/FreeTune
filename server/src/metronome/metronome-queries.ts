import db from "../config/db";

export async function insertDefualtMetronome(userId: number) {
  return await db.none(`INSERT INTO metronome (user_id) VALUES ($1)`, [userId]);
}
