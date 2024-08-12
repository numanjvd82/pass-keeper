import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";
import { z } from "zod";
import { userModel } from "../../models/user";

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
  encryptedKey: string;
  iv: string;
  authTag: string;
  createdAt: Date;
  updatedAt: Date;
};

export function registerUser(req: Request, res: Response) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const parsedValues = registerSchema.parse({ email, password, name });

    const existingUser = userModel.findOneByEmail(email);

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

        try {
          // Random key for encryption
          const encryptionKey = crypto.randomBytes(32);

          // derive a key from the password
          const deriveKey = crypto.pbkdf2Sync(
            parsedValues.password,
            "salt",
            100000,
            32,
            "sha256"
          );

          // encrypt the key with the derived key using AES-256-GCM
          const iv = crypto.randomBytes(12);
          const cipher = crypto.createCipheriv("aes-256-gcm", deriveKey, iv);
          const encryptedKey = Buffer.concat([
            cipher.update(encryptionKey),
            cipher.final(),
          ]).toString("hex");
          const authTag = cipher.getAuthTag().toString("hex");

          userModel.createOne({
            name: parsedValues.name,
            email: parsedValues.email,
            hashedPassword: hash,
            encryptedKey,
            iv: iv.toString("hex"),
            authTag,
          });

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
