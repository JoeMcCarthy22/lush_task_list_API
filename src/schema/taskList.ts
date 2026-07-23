import builder from "../builder.js";

builder.objectType("TaskList", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    createdAt: t.string({
      resolve: (taskList) => taskList.createdAt.toISOString(),
    }),
    tasks: t.field({
      type: ["Task"],
      resolve: (taskList) => taskList.tasks,
    }),
  }),
});