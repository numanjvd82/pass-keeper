import { Folder } from ".";
import { db } from "../..";
import { sql } from "../../lib/utils";

const query = sql`
  SELECT * FROM folders
`;

export function list() {
  const stmt = db.prepare(query);
  return stmt.all() as Folder[];
}
