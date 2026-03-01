import { Eta } from "eta";
const profileTemplate = (profileInfo) => {
  const eta = new Eta({ views: "public/templates" });
  return eta.render("/profile.eta", profileInfo);
};

export const profile = (context) => {
  const notes = context.get("notes");
  const page = profileTemplate({ notes });
  return context.html(page);
};
