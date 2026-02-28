export const insertIntoNotes = (db, noteName, note, userId) => {
  const query = `INSERT INTO notes (name, note, user_id) VALUES (?, ?, ?)`;
  const statement = db.prepare(query);
  const insertInfo = statement.run(noteName, note, userId);
  return insertInfo;
};

export const notesList = (db, userId) => {
  const query = `SELECT name, note FROM notes WHERE user_id = ?`;
  const statement = db.prepare(query);
  return statement.all(userId);
};