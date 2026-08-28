import { id } from "zod/locales";
import builder from "../builder.js";
import { TaskListNotFoundError, TaskNotFoundError } from "../errors.js";
import {
  addTaskListSchema,
  addTaskSchema,
  deleteTaskSchema,
  updateTaskSchema,
  completeAllTasksSchema,
} from "../validation/task.js";

builder.mutationType({
  // add task list
  fields: (t) => ({
    addTaskList: t.field({
      type: "TaskList",
      args: {
        name: t.arg.string({
          required: true,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        const validated = addTaskListSchema.parse(args);
        return ctx.db.taskList.create({
          data: {
            name: validated.name,
          },
        });
      },
    }),

    // add task
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
        const validated = addTaskSchema.parse(args);

        const taskList = await ctx.db.taskList.findUnique({
          where: {
            id: validated.taskListId,
          },
        });

        if (!taskList) {
          throw new TaskListNotFoundError();
        }

        return ctx.db.task.create({
          data: {
            title: validated.title,
            taskListId: validated.taskListId,
          },
        });
      },
    }),

    // update task
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
        const task = await ctx.db.task.findUnique({
          where: {
            id: args.id,
          },
        });

        if (!task) {
          throw new TaskNotFoundError();
        }

        const validated = updateTaskSchema.parse(args);

        return ctx.db.task.update({
          where: {
            id: validated.id,
          },
          data: {
            title: validated.title,
            completed: validated.completed,
          },
        });
      },
    }),

    // delete task
    deleteTask: t.field({
      type: "Task",
      args: {
        id: t.arg.int({
          required: true,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        const task = await ctx.db.task.findUnique({
          where: {
            id: args.id,
          },
        });

        if (!task) {
          throw new TaskNotFoundError();
        }

        const validated = deleteTaskSchema.parse(args);

        return ctx.db.task.delete({
          where: {
            id: validated.id,
          },
        });
      },
    }),

     // complete all tasks in a task list
    completeAllTasks: t.field({
      type: ["Task"],
      args: {
        taskListId: t.arg.int({
          required: true
        })
      },
      resolve: async(_parent, args, ctx) => {
        const validated = completeAllTasksSchema.parse(args);
        const taskList = await ctx.db.taskList.findUnique({
          where: {
            id: args.taskListId,
          },
        });

        if (!taskList){
          throw new TaskListNotFoundError();
        }

        await ctx.db.task.updateMany({
          where: {
            taskListId: validated.taskListId, 
          },
          data: {
            completed: true,
          }
        });

        return ctx.db.task.findMany({
          where: {
            taskListId: validated.taskListId,
          },
        });
      },
    }),
  }),
});
