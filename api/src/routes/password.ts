import express, { Request, Response } from "express";
import { passwordModel } from "../models/password";

const passwordRouter = express.Router();

passwordRouter.get("/", (req: Request, res: Response) => {
  try {
    const queryParams = {
      filter: {
        search: req.query.search ? String(req.query.search) : undefined,
      },
    };

    const list = passwordModel.list(queryParams);

    res.json(list);
  } catch (e: any) {
    console.log(e.message);
    return res.status(400).json({ error: e.message });
  }
});

export default passwordRouter;
