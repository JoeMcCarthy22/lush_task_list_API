import builder from "./builder.js";

import "./schema/taskList.js";
import "./schema/task.js";

import "./resolvers/query.js";
import "./resolvers/mutation.js";

const schema = builder.toSchema();

export default schema;
