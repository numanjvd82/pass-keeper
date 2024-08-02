import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";
import { db } from "../..";
import { sql } from "../../dbInit";
import { userModel } from "../../models/User";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type FullUser = {
  id: number;
  email: string;
  hashedPassword: string;
};

export function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Invalid request" });
  }

  // validate request
  try {
    registerSchema.parse({ email, password });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }

  // TODO: check if email is already in use
  const existingUser = userModel.findOne(email);

  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }

  // hash password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong" });
      }

      // create user
      try {
        db.prepare(
          sql`
      INSERT INTO users (email, hashedPassword)
      VALUES (?, ?);
    `
        ).run(email, hash);

        return res.status(200).json({ message: "User created" });
      } catch (e) {
        return res.status(500).json({ error: "Something went wrong" });
      }
    });
  });
}
