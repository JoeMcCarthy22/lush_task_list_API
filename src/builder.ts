/* Create one SchemaBuilder instance and export it for use in other files. */

import SchemaBuilder from "@pothos/core";
import type db from "./db.js";

const builder = new SchemaBuilder<{
  Context: {
    db: typeof db;
  };
}>({});

export default builder;
