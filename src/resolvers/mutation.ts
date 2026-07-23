import builder from "../builder.js";

builder.mutationType({
  fields: (t) => ({
    addTaskList: t.field({
      type: "TaskList",
      args: {
        name: t.arg.string({
          required: true,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        return ctx.db.taskList.create({
          data: {
            name: args.name,
          },
        });
      },
    }),
  }),
});

