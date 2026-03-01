import { Eta } from "eta";
const profileTemplate = (profileInfo) => {
  const eta = new Eta({ views: "public/templates" });
  return eta.render("/profile.eta", profileInfo);
};

export const profile = (context) => {
  const username = context.get("username");
  const userId = context.get("userId");
  const notes = context.get("notes");
  const page = profileTemplate({ notes, username, userId  });
  return context.html(page);
};
