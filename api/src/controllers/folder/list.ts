import { Request, Response } from "express";
import { Folder, folderModel } from "../../models/folder";

export function listFolders(req: Request, res: Response): Response<Folder[]> {
  try {
    const list = folderModel.list();
    return res.json(list);
  } catch (e: any) {
    if (process.env.ENV === "DEV") {
      console.log(e);
    }
    return res.status(400).json({ error: e.message });
  }
}
