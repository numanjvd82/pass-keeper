import { z } from "zod";
import { Folder } from ".";
import { db } from "../..";
import { sql } from "../../lib/utils";

export const addFolderSchema = z.object({
  name: z.string().min(1).max(50),
});

export type AddFolderInput = z.infer<typeof addFolderSchema> & {
  userId: number;
};

export function add(input: AddFolderInput) {
  const { name } = addFolderSchema.parse(input);

  // Add folder to database
  const stmt = db.prepare(sql`
INSERT INTO folders (name, userId)
VALUES (?, ?)
RETURNING *;
  `);
  const insertedFolder = stmt.get(name, input.userId);
  return insertedFolder as Folder;
}
