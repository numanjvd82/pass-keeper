import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token
    verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      // Attach the user ID to the request object
      // @ts-ignore
      req.userId = decoded.id;
    });

    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
}
