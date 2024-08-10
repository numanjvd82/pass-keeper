import { Request, Response } from "express";
import { Password, passwordModel } from "../../models/password";
import { AddPasswordInput } from "../../models/password/add";
import { userModel } from "../../models/user";

export function addPassword(req: Request, res: Response): Response<Password> {
  try {
    //@ts-expect-error userId is not defined
    const { userId } = req;

    if (!userId) {
      // bad request
      return res.status(400).json({ message: "Something went wrong" });
    }

    const id = parseInt(userId);

    const user = userModel.findOneById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const password = req.body as AddPasswordInput;

    const add = passwordModel.add({
      ...password,
      userId: user.id,
    });
    return res.json(add);
  } catch (e: unknown) {
    if (process.env.ENV === "DEV") {
      console.log(e);
    }
    if (e instanceof Error) {
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: "Something went wrong" });
  }
}
