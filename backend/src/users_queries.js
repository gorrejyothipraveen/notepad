export const insertIntoUsers = (db, username, password) => {
  const query = `INSERT INTO users (name, password) VALUES (?, ?)`;
  const statement = db.prepare(query);
  const insertInfo = statement.run(username, password);
  return insertInfo;
};

export const usersList = (db) => {
  const query = `SELECT id, name FROM users`;
  const statement = db.prepare(query);
  return statement.all();
};
