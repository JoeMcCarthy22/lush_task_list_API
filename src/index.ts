import { createYoga } from "graphql-yoga";  // imports's yoga's function creating a graphql server
import { createServer } from "node:http";
import { AppError } from "./errors.js";
import { useMaskedErrors } from "@envelop/core";

import schema from "./schema.js";
import db from "./db.js";

import yoga from "./yoga.js";

const server = createServer(yoga); // create a Node.js HTTP server with the Yoga instance
server.listen(4000, () => {
  console.log("Server running on http://localhost:4000/graphql");
});