import { createApp } from "./backend/src/app.js";

const main = () => {
  const app = createApp();
  Deno.serve({ port: 8000 }, app.fetch);
};

main();