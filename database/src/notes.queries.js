export const insertIntoNotes = (db, noteName, note, userId) => {
  const query = `INSERT INTO notes (name, note, user_id) VALUES (?, ?, ?)`;
  const statement = db.prepare(query);
  const insertInfo = statement.run(noteName, note, userId);
  return insertInfo;
};

export const notesList = (db, userId) => {
  const query = `SELECT id, name, note FROM notes WHERE user_id = ?`;
  const statement = db.prepare(query);
  return statement.all(userId);
};

export const getNote = (db, noteId) => {
  const query = `SELECT name, note FROM notes WHERE id = ?`;
  const statement = db.prepare(query);
  return statement.get(noteId);
};

export const updateNote = (db, noteId, note) => {
  const query = `update notes set note = ? where id = ?`;
  const statement = db.prepare(query);
  return statement.run(note, noteId);
};
