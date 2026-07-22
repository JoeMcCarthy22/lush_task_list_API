/* Create one SchemaBuilder instance and export it for use in other files. */

import SchemaBuilder from "@pothos/core";

const builder = new SchemaBuilder({});         /* an object that builds our GraphQL Schema. */

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "Hello, world!",
    }),
  }),
});

export default builder;