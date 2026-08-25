import { createYoga } from "graphql-yoga";
import db from "./db.js";
import schema from "./schema.js";

const yoga = createYoga({
  schema,
  context: {
    db,
  },
  maskedErrors: false,
});

export default yoga;
