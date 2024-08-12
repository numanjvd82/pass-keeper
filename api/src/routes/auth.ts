import express from "express";
import { loginUser } from "../controllers/auth/loginUser";
import { registerUser } from "../controllers/auth/registerUser";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", (req, res) => {
  res.json({ authenticated: true });
});

export default authRouter;
