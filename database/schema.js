import Realm from "realm";

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
  },
  primaryKey: "_id",
};

const databaseOptions = {
  path: "task.realm",
  schema: [TaskSchema],
};

const open = async (databaseOptions) => {
  return await Realm.open(databaseOptions);
}

const close = async (db) => {
  await db.close();
}

const insertNewTask = async (id, name, status) => {
  const db = await open(databaseOptions);
  let task = {};
  db.write(() => {
    task = db.create("Task", {
      _id: id,
      name,
      status
    });
  });
  return task;
};

const getTasks = async () => {
  const db = await open(databaseOptions);
  const tasks = db.objects("Task");
  // await db.close();
  return tasks;
}

const updateTask = async (id, name, status) => {
  const db = await open(databaseOptions);
  const task = db.objects("Task").find(`_id = ${id}`);
  db.write(() => {
    task.status = status;
    task.name = name;
  });
  // await db.close();
  return task;
};

const deleteTask = async (id) => {
  const db = await open(databaseOptions);
  const task = db.objects("Task").find(`_id = ${id}`);
  db.write(() => {
    db.delete(task);
  });
  // await db.close();
};

export { getTasks, insertNewTask, updateTask, deleteTask };

