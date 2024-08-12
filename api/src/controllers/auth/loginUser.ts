import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { userModel } from "../../models/user";

export function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const user = userModel.findOneByEmail(email);

  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // compare password
  bcrypt.compare(password, user.hashedPassword, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }

    if (!result) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    try {
      // create token
      const accessToken = sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      // derive a temporary key from the user's password
      const derivedKey = crypto.pbkdf2Sync(
        password,
        "salt",
        100000,
        32,
        "sha256"
      );

      // decrypt the stored encrypted key with the derived key using AES-256-GCM
      const decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        derivedKey,
        Buffer.from(user.iv, "hex")
      );
      decipher.setAuthTag(Buffer.from(user.authTag, "hex"));

      const decryptedKey = Buffer.concat([
        decipher.update(Buffer.from(user.encryptedKey, "hex")),
        decipher.final(),
      ]);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.ENV === "PROD",
      });
      return res.status(200).json({ decryptedKey });
    } catch (e) {
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  });
}
