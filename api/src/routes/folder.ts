import express from "express";
import { listFolders } from "../controllers/folder/list";

const folderRouter = express.Router();

folderRouter.get("/", listFolders);

export default folderRouter;
