import { createApp } from "./backend/src/app.js";
import { createDB } from "./database/src/common_queries.js";
// import { insertIntoNotes } from "./database/src/notes.queries.js";
// import { insertIntoUsers } from "./database/src/users_queries.js";

const main = () => {
  const db = createDB('notepad.db');
  const app = createApp(db);
  Deno.serve({ port: 8000 }, app.fetch);
};

main();
