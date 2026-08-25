import { createServer } from "node:http";

import yoga from "./yoga.js";

const server = createServer(yoga); // create a Node.js HTTP server with the Yoga instance
server.listen(4000, () => {
  console.log("Server running on http://localhost:4000/graphql");
});
