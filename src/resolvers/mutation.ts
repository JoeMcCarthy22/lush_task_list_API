import { argsToArgsConfig } from "graphql/type/definition.js";
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

    addTask: t.field({
      type: "Task",
      args: {
        taskListId: t.arg.int({
          required: true,
        }),
        title: t.arg.string({
          required: true,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        return ctx.db.task.create({
          data: {
            title: args.title,
            taskListId: args.taskListId,
          },
        });
      },
    }),

    updateTask: t.field({
      type: "Task",
      args: {
        id: t.arg.int({
          required: true,
        }),
        title: t.arg.string({
          required: false,
        }),
        completed: t.arg.boolean({
          required: false,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        return ctx.db.task.update({
          where: {id: args.id, 
          },
        data: {
          title: args.title,
          completed: args.completed,
        },
        });
      }
    }),

    deleteTask: t.field({
      type: "Task",
      args: {
        id: t.arg.int({
          required: true,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        return ctx.db.task.delete({
          where: {
            id: args.id,
          },
        }) 
      },
    }),

  }),
});