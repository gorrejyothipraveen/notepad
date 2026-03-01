import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { login } from "./authentication_handler.js";
import {
  allowAccountExistUsers,
  rejectAuthorizedUsers,
  retrieveDetails,
  setNoteDetailsIntoContext,
  setUserDetailsIntoContext,
} from "./middleware_handlers.js";
import { editNote, profile, useNote } from "./profile_handlers.js";

export const createApp = (db) => {
  const app = new Hono();

  app.use(logger());

  app.use("*", async (c, next) => {
    c.set("db", db);
    await next();
  });

  app.post("/edit_note/:noteId", retrieveDetails, editNote);
  app.get("/useNote/:noteId", setNoteDetailsIntoContext, useNote);
  app.get("/profile", setUserDetailsIntoContext, profile);
  app.post("/login", allowAccountExistUsers, login);
  app.get(
    "/login.html",
    rejectAuthorizedUsers,
    serveStatic({ root: "public" }),
  );
  app.get("*", serveStatic({ root: "public" }));
  return app;
};
