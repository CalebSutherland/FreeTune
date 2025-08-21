import pgPromise from "pg-promise";
import dotenv from "dotenv";

const pgp = pgPromise();
dotenv.config();

const db = pgp({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default db;
