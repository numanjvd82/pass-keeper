import express from "express";
import { addFolder } from "../controllers/folder/add";
import { editFolder } from "../controllers/folder/edit";
import { listFolders } from "../controllers/folder/list";

const folderRouter = express.Router();

folderRouter.get("/", listFolders);
folderRouter.post("/", addFolder);
folderRouter.patch("/:id", editFolder);

export default folderRouter;
