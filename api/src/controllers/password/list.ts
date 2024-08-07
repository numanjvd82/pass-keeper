import { Request, Response } from "express";
import { passwordModel } from "../../models/password";

export function listPasswords(req: Request, res: Response) {
  try {
    const list = passwordModel.list({
      filter: {
        search: (req.query.search as string | undefined) || "",
        folder: (req.query.folder as string | undefined) || "",
      },
    });

    return res.json(list);
  } catch (e: any) {
    if (process.env.ENV === "DEV") {
      console.log(e);
    }
    return res.status(400).json({ error: e.message });
  }
}
