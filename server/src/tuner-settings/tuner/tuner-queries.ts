import db from "../../config/db";

export async function insertDefaultTunerSettings(userId: number) {
  return await db.none(`INSERT INTO tuner_settings (user_id) VALUES ($1)`, [
    userId,
  ]);
}
