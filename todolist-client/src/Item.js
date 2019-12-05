import React from "react";
import axios from "axios";

const Item = props => {
  const { id, text, created_date, status } = props.task;

  const deleteTask = id => {
    axios
      .delete(`http://localhost:4500/task/${id}`)
      .then(res => {
        document.querySelector("#process-result").innerHTML = "Task deleted!";
      })
      .catch(err => {
        document.querySelector("#process-result").innerHTML = err;
      });
  };

  const toggleComplete = id => {
    let statusToUpdate = props.todos.find(task => task.id === id);

    statusToUpdate.status =
      statusToUpdate.status === "pending" ? "completed" : "pending";
    axios
      .put(`http://localhost:4500/task/status/${id}`, {
        status: statusToUpdate.status.toString()
      })
      .then(res => {
        document.querySelector(
          "#process-result"
        ).innerHTML = `Task ${statusToUpdate.status}!`;
      })
      .catch(err => {
        document.querySelector("#process-result").innerHTML = err;
      });
  };

  return (
    <li>
      <div className="task-context">
        <label id="custome-checkbox-container">
          <input
            type="checkbox"
            className="default-checkbox"
            onChange={() => toggleComplete(id)}
          />
          <span className="custom-checkbox"></span>
          {id} - {text} - {created_date} - {status}
        </label>
      </div>
      <div className="task-btns">
        <button onClick={() => props.getTaskId(id)}>Edit</button>
        <button onClick={() => deleteTask(id)}>delete</button>
      </div>
    </li>
  );
};

export default Item;
