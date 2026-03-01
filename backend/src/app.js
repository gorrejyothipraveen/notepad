import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { login } from "./authentication_handler.js";
import {
  allowAccountExistUsers,
  rejectAuthorizedUsers,
} from "./middleware_handlers.js";

export const createApp = (db) => {
  const app = new Hono();

  app.use(logger());

  app.use("*", async (c, next) => {
    c.set("db", db);
    await next();
  });

  app.post("/login", rejectAuthorizedUsers, allowAccountExistUsers, login);
  app.get("*", serveStatic({ root: "public" }));
  return app;
};
