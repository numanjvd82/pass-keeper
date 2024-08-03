import express from "express";
import { listPasswords } from "../controllers/password/list";

const passwordRouter = express.Router();

passwordRouter.get("/", listPasswords);

export default passwordRouter;
