# Lush Task List API

A GraphQL task management API built with TypeScript, GraphQL Yoga, Pothos, Prisma and PostgreSQL.

The API supports:

* Creating and deleting task lists
* Creating, updating and deleting tasks
* Completing and uncompleting all tasks within a task list
* Querying task lists and tasks
* Offset-based pagination

Validation is handled using Zod.

Custom errors are used for requests involving missing task or task list records.

## Tech Stack

* TypeScript
* GraphQL Yoga
* Pothos GraphQL
* Prisma ORM
* PostgreSQL
* Zod
* Vitest
* Docker

## Installation

Clone the repository:

```bash
git clone https://github.com/JoeMcCarthy22/lush_task_list_API
```

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

The GraphQL endpoint is available at:

```text
http://localhost:4000/graphql
```

## Testing

The project uses Vitest for automated testing.

Run the test suite with:

```bash
npm test
```

The test suite includes unit tests for validation and integration tests covering GraphQL mutations.

## API Examples

### Create a task list

```graphql
mutation {
  addTaskList(name: "Shopping List") {
    id
    name
  }
}
```

### Create a task

```graphql
mutation {
  addTask(taskListId: 1, title: "Submit Application") {
    id
    title
  }
}
```

### Retrieve tasks

```graphql
query {
  tasks(taskListId: 1, take: 5) {
    id
    title
    completed
  }
}
```

### Update a task

```graphql
mutation {
  updateTask(id: 1, completed: true) {
    id
    completed
  }
}
```

### Delete a task

```graphql
mutation {
  deleteTask(id: 1) {
    id
  }
}
```

### Complete all tasks in a task list

```graphql
mutation {
  completeAllTasks(taskListId: 1) {
    id
    title
    completed
  }
}
```

### Uncomplete all tasks in a task list

```graphql
mutation {
  uncompleteAllTasks(taskListId: 1) {
    id
    title
    completed
  }
}
```

### Delete a task list

```graphql
mutation {
  deleteTaskList(id: 1) {
    id
    name
  }
}
```

Deleting a task list also deletes its associated tasks through the database relationship.

### Requesting a task that does not exist

```graphql
query {
  task(id: 999) {
    id
    title
  }
}
```

Returns:

```json
{
  "errors": [
    {
      "message": "Task not found",
      "extensions": {
        "code": "TASK_NOT_FOUND"
      }
    }
  ]
}
```

## Design Decisions

### Validation

Zod is used to validate incoming GraphQL arguments before database operations.

### Error Handling

Custom errors are thrown for missing records to avoid exposing raw Prisma errors. Errors returned to clients include both a human-readable message and machine-readable error code through GraphQL error extensions.

### Pagination

Offset-based pagination is implemented using Prisma's `skip` and `take` arguments.

This approach was chosen for simplicity and predictable task retrieval.

### Database

Prisma with PostgreSQL was chosen as the database layer for the API. Task lists and tasks are connected through a relational database relationship, with associated tasks deleted when their parent task list is deleted.

### Testing

Vitest is used for automated testing.

Unit tests cover validation behaviour, while integration tests exercise the GraphQL API through GraphQL Yoga and verify successful database operations.

## Project Structure

```text
src/

├── builder.ts
├── db.ts
├── errors.ts
├── index.ts
│
├── resolvers/
│   ├── mutation.ts
│   └── query.ts
│
├── schema/
│   ├── task.ts
│   └── taskList.ts
│
├── validation/
│   └── task.ts
│
├── integration.test.ts
└── validation/
    └── task.test.ts
```

## Available Scripts

```bash
npm run dev      # Start development server with watch mode
npm start        # Start the server
npm test         # Run tests with Vitest
npm run lint     # Run Biome checks
npm run format   # Format the project with Biome
```

## Future Improvements

* Improve the formatting of validation errors returned from Zod
* Add authentication and authorisation
* Expand integration test coverage for error cases
* Add further task list and task querying functionality

```


## Git workflow practice
This change was made as part of a practice pull request.