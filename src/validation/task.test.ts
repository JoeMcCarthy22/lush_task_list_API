import { describe, it, expect } from "vitest";
import { addTaskListSchema, addTaskSchema } from "./task.js";

// Task list tests
describe("addTaskListSchema", () => {
  it("accepts a valid task list name", () => {
    const result = addTaskListSchema.parse({
      name: "My Task List",
    });

    expect(result.name).toBe("My Task List");
  });

  it("rejects an empty task list name", () => {
    expect(() =>
      addTaskListSchema.parse({
        name: "",
      })
    ).toThrow();
  });
});

// Task tests
describe("addTaskSchema", () => {
  it("accepts a valid task title and task list id", () => {
    const result = addTaskSchema.parse({
      taskListId: 1,
      title: "My Task",
    });

    expect(result.taskListId).toBe(1);
    expect(result.title).toBe("My Task");
  });

  it("rejects an empty task title", () => {
    expect(() =>
      addTaskSchema.parse({
        taskListId: 1,
        title: "",
      })
    ).toThrow();
  });

  it("rejects an invalid task list id", () => {
    expect(() =>
      addTaskSchema.parse({
        taskListId: 0,
        title: "My Task",
      })
    ).toThrow();
  });

  it ("rejects a task title longer than 100 characters", () => {
    expect(() => 
        addTaskSchema.parse({
            title: "a".repeat(101),
        })
    ).toThrow();
  });

});

