import { getCookie } from "hono/cookie";
import { getUser } from "../../database/src/users_queries.js";

export const rejectAuthorizedUsers = async (context, next) => {
  const username = getCookie(context, "username");
  if (username) {
    context.redirect("/profile", 303);
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
  context.set("username", userInfo.name);
  await next();
};
