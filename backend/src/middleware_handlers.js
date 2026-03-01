import { deleteCookie, getCookie } from "hono/cookie";
import { getUser } from "../../database/src/users_queries.js";
import { getNote, notesList } from "../../database/src/notes.queries.js";

export const rejectAuthorizedUsers = async (context, next) => {
  const username = getCookie(context, "username");
  if (username) {
    return context.redirect("/profile", 303);
  }
  await next();
};

export const allowAccountExistUsers = async (context, next) => {
  const db = context.get("db");
  const payload = await context.req.formData();
  const username = payload.get("username");
  const userInfo = getUser(db, username);
  if (!userInfo) {
    return context.redirect("/login.html", 303);
  }
  context.set("userId", userInfo.id);
  context.set("username", userInfo.name);
  await next();
};

export const setUserDetailsIntoContext = async (context, next) => {
  const userId = getCookie(context, "userId");
  const username = getCookie(context, "username");
  const db = context.get("db");
  const notes = notesList(db, userId);
  context.set("notes", notes);
  context.set("userId", userId);
  context.set("username", username);
  // deleteCookie(context, "username");
  await next();
};

export const setNoteDetailsIntoContext = async (context, next) => {
  const db = context.get("db");
  const noteId = context.req.param("noteId");
  const note = getNote(db, noteId);
  context.set("note", note);
  await next();
};
