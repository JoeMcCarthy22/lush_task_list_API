import { createYoga } from "graphql-yoga";
import schema from "./schema.js";
import db from "./db.js";

const yoga = createYoga({
  schema,
  context: {
    db,
  },
  maskedErrors: false,
});

export default yoga;