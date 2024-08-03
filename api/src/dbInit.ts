import { db } from ".";
import { sql } from "./lib/utils";

export function initDb() {
  // write to the terminal
  console.log("Initializing database...");
  db.exec(sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      hashedPassword TEXT NOT NULL
    );
  `);

  db.exec(sql`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL REFERENCES users(id),
      name TEXT NOT NULL
    );
  `);

  db.exec(sql`
    CREATE TABLE IF NOT EXISTS passwords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      folderId INTEGER NOT NULL REFERENCES folders(id),
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);

  console.log("Database initialized.");
}
