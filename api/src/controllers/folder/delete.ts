import { Request, Response } from "express";
import { Folder, folderModel } from "../../models/folder";

export function deleteFolder(req: Request, res: Response): Response<Folder> {
  try {
    //@ts-expect-error userId is not defined
    const { userId } = req;

    if (!userId)
      // bad request
      return res.status(400).json({ message: "Something went wrong" });

    const { id } = req.params as { id: string };

    if (!id)
      return res.status(400).json({ message: "Name and id are required" });

    const folderId = parseInt(id, 10);

    const deletedFolder = folderModel.delete({ id: folderId, userId });
    return res.json(deletedFolder);
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
