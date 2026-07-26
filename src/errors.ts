export class AppError extends Error {
  extensions: { code: string };

  constructor(message: string, code: string) {
    super(message);
    this.extensions = {
      code,
    };
  }
}

export class TaskNotFoundError extends AppError {
  constructor() {
    super("Task not found", "TASK_NOT_FOUND");
  }
}

export class TaskListNotFoundError extends AppError {
  constructor() {
    super("Task list not found", "TASK_LIST_NOT_FOUND");
  }
}