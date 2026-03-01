import { Eta } from "eta";
const profileTemplate = (profileInfo) => {
  const eta = new Eta({ views: "public/templates" });
  return eta.render("/profile.eta", profileInfo);
};

const noteTemplate = (noteInfo) => {
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
  const page = noteTemplate({ note: note.note });
  return context.html(page);
};

export const editNote = (context) => {
  const note = context.get("newNote");
  updateNote(db, id, note);
  context.redirect("/profile", 303);
};
