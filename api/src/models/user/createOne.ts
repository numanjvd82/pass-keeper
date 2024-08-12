import { z } from "zod";
import { db } from "../..";
import { sql } from "../../lib/utils";

export const createOneSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(20),
  email: z.string().email(),
  hashedPassword: z.string(),
  encryptedKey: z.string(),
  iv: z.string(),
  authTag: z.string(),
});

export type CreateOneInput = z.infer<typeof createOneSchema>;

export function createOne(input: CreateOneInput) {
  if (!input) {
    throw new Error("Invalid request");
  }

  const { name, email, hashedPassword, encryptedKey, iv, authTag } =
    createOneSchema.parse(input);

  const result = db.prepare(
    sql`INSERT INTO users (name, email, hashedPassword, encryptedKey, iv, authTag) VALUES (?, ?, ?, ?, ?, ?);`
  );

  return result.run(name, email, hashedPassword, encryptedKey, iv, authTag);
}
