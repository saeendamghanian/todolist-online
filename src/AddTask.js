import React from "react";
import axios from "axios";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";

class AddTask extends React.Component {
  state = {
    userInput: null
  };

  addTaskToDB = task => {
    if (task !== null) {
      axios
        .post("https://sd-todolist-server.herokuapp.com/tasks", {
          text: task.toString()
        })
        .then(res => {
          document.querySelector("#process-result").innerHTML = "Task added!";
        })
        .catch(err => {
          document.querySelector("#process-result").innerHTML = err;
        });
    } else {
      document.querySelector("#process-result").innerHTML =
        "The field is empty!";
    }
  };

  addButtonClick = () => {
    this.addTaskToDB(this.state.userInput);
    document.querySelector("#user-input").value = "";
  };

  render() {
    return (
      <div className="add-new-task">
        <input
          type="text"
          id="user-input"
          className="text-input"
          onChange={event => this.setState({ userInput: event.target.value })}
        />
        <label>
          <button onClick={this.addButtonClick} className="add-btn">
            <i>
              <AddBoxRoundedIcon />
            </i>
          </button>
        </label>
      </div>
    );
  }
}

export default AddTask;
