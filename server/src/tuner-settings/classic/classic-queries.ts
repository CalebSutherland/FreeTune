import db from "../../config/db";

export async function insertDefaultClassicSettings(userId: number) {
  return await db.none(
    `INSERT INTO classic_tuner_settings (user_id) VALUES ($1)`,
    [userId]
  );
}
