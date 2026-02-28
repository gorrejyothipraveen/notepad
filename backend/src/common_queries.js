/* - users information :
  - id
  - username

- notes information :
  - id
  - note name
  - note content
  - user_id (from the users table)
  */

import { DatabaseSync } from "node:sqlite";

export const createDB = (filename) => new DatabaseSync(filename);

export const createTables = (database) => {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      note TEXT NOT NULL,
      user_id INTEGER REFERENCES users(id),
      UNIQUE (user_id, name)
    );
  `);
};




