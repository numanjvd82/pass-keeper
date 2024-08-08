import { z } from "zod";
import { Folder } from ".";
import { db } from "../..";
import { sql } from "../../lib/utils";

export const editFolderSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(50),
});

export type EditFolderInput = z.infer<typeof editFolderSchema> & {
  userId: number;
};

export function edit(input: EditFolderInput) {
  const { id, name } = editFolderSchema.parse(input);

  // Update folder in database
  const stmt = db.prepare(sql`
UPDATE folders
SET name = ?
WHERE id = ? AND userId = ?
RETURNING *;
  `);
  const updatedFolder = stmt.get(name, id, input.userId);
  return updatedFolder as Folder;
}
