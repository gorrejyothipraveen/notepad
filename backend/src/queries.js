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
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      note TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE (user_id, name)
    );
  `);
};

export const insertIntoUsers = (db, username) => {
  const query = `INSERT INTO users (name) values (?)`;
  const statement = db.prepare(query);
  const insertInfo = statement.run(username);
  return insertInfo;
};
