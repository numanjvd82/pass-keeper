import { z } from "zod";
import { Password } from ".";
import { db } from "../..";
import { sql } from "../../lib/utils";

export const addPasswordSchema = z.object({
  passwordName: z.string(),
  folderId: z.number().nullable(),
  username: z.string(),
  password: z.string(),
  uri: z.string().url().optional(),
  notes: z.string().optional(),
});

export type AddPasswordInput = z.infer<typeof addPasswordSchema> & {
  userId: number;
};

export const add = (input: AddPasswordInput) => {
  const { passwordName, folderId, username, password, uri, notes } =
    addPasswordSchema.parse(input);

  const stmt = db.prepare(sql`
INSERT INTO passwords (userId, name, folderId, username, password, uri, notes)
VALUES (?, ?, ?, ?, ?, ?, ?)
RETURNING *;
    `);

  const result = stmt.get(
    ...[input.userId, passwordName, folderId, username, password, uri, notes]
  ) as Password;

  return result;
};
