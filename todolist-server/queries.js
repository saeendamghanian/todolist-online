const { Pool } = require("pg"),
  pool = new Pool({
    host: "localhost",
    database: "cyf_todolist",
    user: "cyf",
    password: "password"
  });

const get_all_tasks = (req, res) => {
  pool.query("SELECT * FROM tasks ORDER BY id DESC", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const create_task = (req, res) => {
  let date = new Date(Date.now()).toISOString();
  let { text } = req.body;

  pool.query(
    "INSERT INTO tasks (text, status, created_date) VALUES ($1, $2, $3)",
    [text, "pending", date],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).send(`Task addes!`);
    }
  );
};

const edit_task = (req, res) => {
  let id = req.params.id;
  // let date = new Date(Date.now()).toISOString();
  let { text, status, created_date } = req.body;

  pool.query(
    "UPDATE tasks SET text = $1, status = $2, created_date = $3 WHERE id = $4",
    [text, status, created_date, id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send("Task updated!");
    }
  );
};

const delete_task = (req, res) => {
  let id = req.params.id;

  pool.query("DELETE FROM tasks WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send("Task deleted!");
  });
};

const edit_task_status = (req, res) => {
  let id = req.params.id,
    { status } = req.body;

  pool.query(
    "UPDATE tasks SET status = $1 WHERE id = $2",
    [status, id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send("Task status updated!");
    }
  );
};

module.exports = {
  get_all_tasks,
  create_task,
  edit_task,
  delete_task,
  edit_task_status
};
