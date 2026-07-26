# Lush Task List API

A GraphQL task management API built with TypeScript, GraphQL Yoga, Pothos, Prisma and SQLite.

The API supports:

* creating task lists
* creating, updating and deleting tasks
* querying task lists and tasks

Validation is handled using Zod.
Errors are handled deliberately for requests involving missing task records.

## Tech Stack

* TypeScript
* GraphQL Yoga
* Pothos GraphQL
* Prisma ORM
* SQLite
* Zod

## Installation

Clone the repository:

```bash
git clone https://github.com/JoeMcCarthy22/lush_task_list_API
```

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run dev
```

The GraphQL endpoint is available at:

```
http://localhost:4000/graphql
```

## API Examples

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

### Update a task (completion status or title)

```graphql
mutation {
  updateTask(id: 1, completed: true) {
    id
    completed
  }
}
```

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

Prisma with SQLite was chosen to provide a lightweight and portable database setup suitable for this API. Task lists and tasks are connected.

### Testing

Automated tests were not added due to the time constraints of this exercise. With more time, I would add Vitest integration tests covering successful operations and deliberate error cases.

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
└── validation/
    └── task.ts
```

## Future Improvements

- Add automated API tests using Vitest
- Improve the formatting of validation errors returned from Zod
- Add authentication and authorisation