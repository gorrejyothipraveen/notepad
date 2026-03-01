export const profile = (context) => {
  console.log('profile page : ')
  const notes = context.get("notes");
  return context.json({ notes });
};
