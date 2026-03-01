import { createApp } from "./backend/src/app.js";
import { createDB } from "./database/src/common_queries.js";

const main = () => {
  const db = createDB('notepad.db');
  const app = createApp(db);
  Deno.serve({ port: 8000 }, app.fetch);
};

main();
