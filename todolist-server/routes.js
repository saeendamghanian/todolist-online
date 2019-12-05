module.exports = app => {
  const db = require("./queries");

  app
    .route("/tasks")
    .get(db.get_all_tasks)
    .post(db.create_task);

  app
    .route("/task/:id")
    .put(db.edit_task)
    .delete(db.delete_task);

  app.route("/task/status/:id").put(db.edit_task_status);
};
