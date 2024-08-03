import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";
import { db } from "../..";
import { sql } from "../../lib/utils";
import { userModel } from "../../models/User";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((password) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
        password
      );
    }),
});

export type FullUser = {
  id: number;
  name: string;
  email: string;
  hashedPassword: string;
};

export function registerUser(req: Request, res: Response) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Invalid request" });
  }

  // validate request
  try {
    const parsedValues = registerSchema.parse({ email, password, name });

    // check if email is already in use
    const existingUser = userModel.findOne(email);

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong" });
      }

      bcrypt.hash(parsedValues.password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: "Something went wrong" });
        }

        // create user
        try {
          // FUTURE ! Create a method on the user model to create a user
          db.prepare(
            sql`
      INSERT INTO users (name, email, hashedPassword)
      VALUES (?, ?, ?);
    `
          ).run(parsedValues.name, parsedValues.email, hash);

          return res.status(200).json({ message: "User created" });
        } catch (e) {
          return res.status(500).json({ error: "Something went wrong" });
        }
      });
    });
  } catch (e: any) {
    console.log(e);
    return res.status(400).json({ error: e.message });
  }
}
