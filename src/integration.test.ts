import { describe, it, expect } from "vitest";
import yoga from "./yoga.js";
import db from "./db.js";
import { xid } from "zod";

// test mutation to add task list
const addTaskList = `
  mutation {
    addTaskList(name: "Integration Test List") {
      id
      name
    }
  }
`;

it("creates a task list with the correct name", async () => {
    const response = await yoga.fetch(
        "http://localhost:4000/graphql",
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: addTaskList,
        }),
    }
)

    const result = await response.json();

    expect(result.data.addTaskList.name).toBe("Integration Test List");
});