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
      hashedPassword TEXT NOT NULL,
      encryptedKey TEXT NOT NULL,
      iv TEXT NOT NULL,
      authTag TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.exec(sql`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.exec(sql`
    CREATE TABLE IF NOT EXISTS passwords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      folderId INTEGER REFERENCES folders(id) ON DELETE SET NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      uri TEXT NULL,
      notes TEXT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Database initialized.");
}
