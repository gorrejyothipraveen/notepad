import { deleteCookie, setCookie } from "hono/cookie";

export const login = (context) => {
  const username = context.get("username");
  const userId = context.get("userId");
  setCookie(context, "username", username);
  setCookie(context, "userId", userId);
  return context.redirect("/profile", 303);
};

export const logout = (context) => {
  deleteCookie(context, "username");
  deleteCookie(context, "userId");
  return context.redirect("/login.html", 303);
};
