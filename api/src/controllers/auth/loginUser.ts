import bcrypt from "bcrypt";
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

      return res.status(200).json({ accessToken });
    } catch (e) {
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  });
}
