export const insertIntoUsers = (db, username) => {
  const query = `INSERT INTO users (name) VALUES (?)`;
  const statement = db.prepare(query);
  const insertInfo = statement.run(username);
  return insertInfo;
};

export const usersList = (db) => {
  const query = `SELECT name FROM users`;
  const statement = db.prepare(query);
  return statement.all();
};
