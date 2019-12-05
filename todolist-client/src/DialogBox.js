import React from "react";
import axios from "axios";

const DialogBox = props => {
  const editTask = id => {
    let taskToUpdate = document.querySelector("#edited-input-value").value;
    let editedTask = props.todos.find(task => task.id === id);
    console.log(taskToUpdate + id);
    let updateDate = new Date(Date.now()).toISOString();

    axios
      .put(`http://localhost:4500/task/${id}`, {
        text: taskToUpdate.toString(),
        status: editedTask.status,
        created_date: updateDate
      })
      .then(res => {
        document.querySelector("#process-result").innerHTML = "Task updated!";
      })
      .catch(err => {
        document.querySelector("#process-result").innerHTML = err;
      });
    document.querySelector("#edit-dialog-bg").style.display = "none";
    document.querySelector("#edit-dialog").style.display = "none";
    document.querySelector("#edited-input-value").value = "";
    // }
  };

  const closeDialogBox = () => {
    document.querySelector("#edit-dialog-bg").style.display = "none";
    document.querySelector("#edit-dialog").style.display = "none";
  };

  return (
    <div id="edit-dialog-bg">
      <div id="container-edit-dialog">
        <div id="edit-dialog">
          <h2>Edit</h2>
          <input id="edited-input-value" className="text-input" type="text" />
          <div>
            <div id="dialog-bx-btns">
              <button onClick={() => editTask(props.taskId)}>Done</button>
              <button onClick={closeDialogBox}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
