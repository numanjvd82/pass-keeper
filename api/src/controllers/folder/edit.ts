import { Request, Response } from "express";
import { Folder, folderModel } from "../../models/folder";

export function editFolder(req: Request, res: Response): Response<Folder> {
  try {
    //@ts-expect-error userId is not defined
    const { userId } = req;

    if (!userId) {
      // bad request
      return res.status(400).json({ message: "Something went wrong" });
    }

    const { name } = req.body as Folder;
    const { id } = req.params as { id: string };

    if (!name || !id) {
      return res.status(400).json({ message: "Name and id are required" });
    }

    const folderId = parseInt(id, 10);

    const editedFolder = folderModel.edit({ name, id: folderId, userId });
    return res.json(editedFolder);
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
