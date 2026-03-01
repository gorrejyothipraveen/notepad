import { setCookie } from "hono/cookie";

export const login = (c) => {
  /*
    - take the form data
    - retrieve the record from the users table
    - check whether present or not
    - all these comes under middle ware
    - if yes then redirect to profile page
  */
  const username = c.get("username");
  setCookie(c, "username", username);
  return c.redirect("/profile", 303);
};
