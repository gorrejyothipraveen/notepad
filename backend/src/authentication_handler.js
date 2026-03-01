import { setCookie } from "hono/cookie";

export const login = (context) => {
  const username = context.get("username");
  setCookie(context, "username", username);
  return context.redirect("/profile", 303);
};
