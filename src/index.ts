import { createYoga } from "graphql-yoga";  // imports's yoga's function creating a graphql server
import { createServer } from "node:http";
import { AppError } from "./errors.js";
import { useMaskedErrors } from "@envelop/core";

import builder from "./builder.js";
import db from "./db.js";

import "./schema/taskList.js";
import "./schema/task.js";

import "./resolvers/query.js";
import "./resolvers/mutation.js";

const schema = builder.toSchema(); // the finished GraphQL schema that Yoga will expose at /graphql.

const yoga = createYoga({
  schema,
  context: {
    db,
  },
  maskedErrors: false,
});



const server = createServer(yoga); // create a Node.js HTTP server with the Yoga instance
server.listen(4000, () => {
  console.log("Server running on http://localhost:4000/graphql");
});