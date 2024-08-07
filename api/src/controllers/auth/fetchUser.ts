import { Request, Response } from "express";
import { userModel } from "../../models/user";
import { FullUser } from "./registerUser";

type PartialUser = Omit<FullUser, "hashedPassword">;

export function fetchUser(req: Request, res: Response): Response<PartialUser> {
  //@ts-ignore
  const userId = req.userId;
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const user = userModel.findOneById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const { hashedPassword, ...partialUser } = user;

  return res.status(200).send(partialUser);
}
