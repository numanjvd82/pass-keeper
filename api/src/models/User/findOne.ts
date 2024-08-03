import { db } from "../..";
import { FullUser } from "../../controllers/auth/registerUser";
import { sql } from "../../lib/utils";

export function findOne(email: string): FullUser | null {
  if (!email) {
    return null;
  }

  const stmt = db.prepare(sql`SELECT * FROM users WHERE email = ?`);
  const user = stmt.get(email);

  if (!user) {
    return null;
  }

  return user as FullUser;
}
