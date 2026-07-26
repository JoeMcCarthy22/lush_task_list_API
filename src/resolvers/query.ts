import builder from "../builder.js";
import { TaskNotFoundError } from "../errors.js";
import { taskSchema } from "../validation/task.js";
import { tasksSchema } from "../validation/task.js";

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
    
    tasks: t.field({
        type: ["Task"],
        args: {
            taskListId: t.arg.int({
                required: true,
            }),
            completed: t.arg.boolean({
                required: false,
            }),
            skip: t.arg.int({
                required: false,
            }),
            take: t.arg.int({
                required: false,
            }),
        },
        resolve: async(_parent, args, ctx) => {
            const validated = tasksSchema.parse(args);

            return ctx.db.task.findMany({
                where: {
                    taskListId: validated.taskListId,
                    completed: validated.completed,
                },
                orderBy: {
                    createdAt: "asc",
                },
                skip: validated.skip,
                take: validated.take,
            })}
    }),

    task: t.field({
        type: "Task",
        args: {
            id: t.arg.int({
                required: true,
            }),
        },

        resolve: async(_parent, args, ctx) => {
            const validated = taskSchema.parse(args);          
            const task = await ctx.db.task.findUnique({
                where: {
                    id: validated.id,
                },
            });
            if (!task) {
            throw new TaskNotFoundError();
            }
            return task;
        }
    })

  }),
});