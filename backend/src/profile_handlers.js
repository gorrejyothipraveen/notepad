import { Eta } from "eta";
import { updateNote } from "../../database/src/notes.queries.js";

const profileTemplate = (profileInfo) => {
  const eta = new Eta({ views: "public/templates" });
  return eta.render("/profile.eta", profileInfo);
};

const noteTemplate = (noteInfo) => {
  console.log(noteInfo)
  const eta = new Eta({ views: "public/templates" });
  return eta.render("/note.eta", noteInfo);
};

export const profile = (context) => {
  const username = context.get("username");
  const userId = context.get("userId");
  const notes = context.get("notes");
  const page = profileTemplate({ notes, username, userId });
  return context.html(page);
};

export const useNote = (context) => {
  const note = context.get("note");
  const noteId = context.get("noteId");
  const page = noteTemplate({ note: note.note, noteId });
  return context.html(page);
};

export const editNote = (context) => {
  const db = context.get("db");
  const note = context.get("newNote");
  const id = context.get("noteId");
  console.log({ note });
  updateNote(db, id, note);
  return context.redirect("/profile", 303);
};

export const addNote = (context) => {
  
}
