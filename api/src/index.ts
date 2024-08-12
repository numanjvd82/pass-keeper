import Database from "better-sqlite3";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { fetchUser } from "./controllers/auth/fetchUser";
import { initDb } from "./dbInit";
import authenticateUser from "./middlewares/authenticate";
import authRouter from "./routes/auth";
import folderRouter from "./routes/folder";
import passwordRouter from "./routes/password";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

export const db = new Database("app.db", {
  verbose: console.log,
});
db.pragma("journal_mode = WAL");

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // React app
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use(authenticateUser);
app.get("/user", fetchUser);
app.use("/passwords", passwordRouter);
app.use("/folders", folderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Api Health OK");
});

app.listen(port, () => {
  initDb();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
