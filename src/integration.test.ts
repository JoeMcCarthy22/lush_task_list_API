import { expect, it } from "vitest";
import yoga from "./yoga.js";

// test mutation to add task list
const addTaskList = `
  mutation {
    addTaskList(name: "Integration Test List") {
      id
      name
    }
  }
`;

// integration test to add a task list
it("creates a task list with the correct name", async () => {
  const response = await yoga.fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: addTaskList,
    }),
  });

  const result = await response.json();

  expect(result.data.addTaskList.name).toBe("Integration Test List");
});

// delete a task list

// add task list first
it("adds a task list, then deletes the task list", async () => {
  const response = await yoga.fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: addTaskList,
    }),
  });

  const result = await response.json();

  const taskListId = result.data.addTaskList.id;

  // test mutation to delete task list

  const deleteTaskList = `
    mutation {
      deleteTaskList(id: ${taskListId}) {
        id
      }
    }
  `;

  // delete task list
  const deleteRequest = await yoga.fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: deleteTaskList,
    }),
  });

  const deleteResponse = await deleteRequest.json();

  expect(deleteResponse.data.deleteTaskList.id).toBe(taskListId);
});
