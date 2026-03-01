export const insertIntoUsers = (db, username, password) => {
  const query = `INSERT INTO users (name, password) VALUES (?, ?)`;
  const statement = db.prepare(query);
  const insertInfo = statement.run(username, password);
  return insertInfo;
};

export const getUser = (db, username) => {
  const query = `SELECT id, name FROM users WHERE name = ?`;
  const statement = db.prepare(query);
  return statement.get(username);
};
