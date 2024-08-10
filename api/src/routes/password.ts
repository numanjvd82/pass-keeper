import express from "express";
import { addPassword } from "../controllers/password/add";
import { listPasswords } from "../controllers/password/list";

const passwordRouter = express.Router();

passwordRouter.get("/", listPasswords);
passwordRouter.post("/", addPassword);

export default passwordRouter;
