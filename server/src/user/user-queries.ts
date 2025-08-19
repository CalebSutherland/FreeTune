import db from "../config/db";
import { User } from "../types/user-types";

export async function insertOAuthUser(
  picture: string | null,
  provider: string,
  providerId: string
) {
  const user: User = await db.one(
    `
    INSERT INTO users (picture, provider, provider_id)
    VALUES ($1, $2, $3)
    ON CONFLICT (provider, provider_id) DO UPDATE SET picture = EXCLUDED.picture
    RETURNING id, picture;
    `,
    [picture, provider, providerId]
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

export async function updatePicture(picture: string | null, userId: number) {
  const user: User = await db.one(
    `
    UPDATE users SET picture = $1 WHERE id = $2 RETURNING id, picture
    `,
    [picture, userId]
  );

  return user;
}

export async function getById(id: number) {
  const user: User | null = await db.oneOrNone(
    `
    SELECT id, picture
    FROM users
    WHERE id = $1
    `,
    [id]
  );
  return user;
}

export async function getByOAuth(provider: string, providerId: string) {
  const user: User | null = await db.oneOrNone(
    `
    SELECT id
    FROM users
    WHERE provider = $1 AND provider_id = $2
    `,
    [provider, providerId]
  );
  return user;
}
