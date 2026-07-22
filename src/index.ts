import { createYoga } from "graphql-yoga";  // imports's yoga's function creating a graphql server
import { createServer } from "node:http";
import builder from "./builder.js";

const schema = builder.toSchema(); // the finished GraphQL schema that Yoga will expose at /graphql.

const yoga = createYoga({     // creates a Yoga server instance with the schema          
  schema,
});

const server = createServer(yoga); // create a Node.js HTTP server with the Yoga instance
server.listen(4000, () => {
  console.log("Server running on http://localhost:4000/graphql");
});