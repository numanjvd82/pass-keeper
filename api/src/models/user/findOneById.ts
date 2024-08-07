import { db } from "../..";
import { FullUser } from "../../controllers/auth/registerUser";
import { sql } from "../../lib/utils";

export function findOneById(id: number): FullUser | null {
  if (!id) {
    return null;
  }

  const stmt = db.prepare(sql`SELECT * FROM users WHERE id = ?`);
  const user = stmt.get(id);

  if (!user) {
    return null;
  }

  return user as FullUser;
}
