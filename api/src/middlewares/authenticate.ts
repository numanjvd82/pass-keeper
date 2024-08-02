import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token
    const decodedToken = verify(token, process.env.JWT_SECRET!);

    // Attach the user ID to the request object
    // @ts-ignore
    req.userId = decodedToken.id;

    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
}
