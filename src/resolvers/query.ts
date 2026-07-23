import builder from "../builder.js";

builder.queryType({
  fields: (t) => ({
    taskLists: t.field({
        type: ["TaskList"],
        resolve: async(_parent, _args, ctx) => {
            return ctx.db.taskList.findMany({
                include: {
                    tasks: true,
                },
            });
        }
    }),
  }),
});