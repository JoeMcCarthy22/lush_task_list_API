export class AppError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

export class TaskNotFoundError extends AppError {
  constructor() {
    super("Task not found", "TASK_NOT_FOUND");
  }
}