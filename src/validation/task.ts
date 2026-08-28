import { z } from "zod";

export const addTaskSchema = z.object({
  taskListId: z.number().int().positive(),

  title: z.string().trim().min(1).max(100),
});

export const updateTaskSchema = z.object({
  id: z.number().int().positive(),

  title: z.string().trim().min(1).max(100).optional(),

  completed: z.boolean().optional(),
});

export const deleteTaskSchema = z.object({
  id: z.number().int().positive(),
});

export const taskSchema = z.object({
  id: z.number().int().positive(),
});

export const tasksSchema = z.object({
  taskListId: z.number().int().positive(),
  completed: z.boolean().optional(),
  skip: z.number().int().nonnegative().optional(),
  take: z.number().int().positive().optional(),
});

export const addTaskListSchema = z.object({
  name: z.string().trim().min(1).max(100),
});

export const completeAllTasksSchema = z.object({
  taskListId: z.number().int().positive(),
});