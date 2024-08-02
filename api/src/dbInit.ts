import { db } from ".";

export const sql = String.raw;

export function initDb() {
  // write to the terminal
  console.log("Initializing database...");
  db.exec(sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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

  // ! This is for testing purposes only
  // db.exec(sql`
  //   INSERT INTO folders (userId, name) VALUES
  //     (1, 'Personal'),
  //     (1, 'Finance'),
  //     (1, 'Social')
  //   `);

  // db.exec(sql`
  // INSERT INTO passwords (userId, name, folderId, username, password) VALUES
  // (1, 'Email Account', 10, 'user@example.com', 'encryptedPassword1'),
  // (1, 'Bank Account', 11, 'bankuser123', 'encryptedPassword2'),
  // (1, 'Social Media', 12, 'socialuser456', 'encryptedPassword3');

  // `);

  console.log("Database initialized.");
}
