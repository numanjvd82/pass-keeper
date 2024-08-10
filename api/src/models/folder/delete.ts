import { z } from "zod";
import { Folder } from ".";
import { db } from "../..";
import { sql } from "../../lib/utils";

export const deleteFolderSchema = z.object({
  id: z.number(),
});

export type DeleteFolderInput = z.infer<typeof deleteFolderSchema> & {
  userId: number;
};

export function deleteFolder(input: DeleteFolderInput) {
  const { id } = deleteFolderSchema.parse(input);

  const tx = db.transaction(() => {
    const stmt = db.prepare(sql`
    DELETE FROM folders
    WHERE id = ? AND userId = ?
    RETURNING *;
      `);
    const folder = stmt.get(id, input.userId) as Folder;

    return folder;
  });

  return tx();
}
