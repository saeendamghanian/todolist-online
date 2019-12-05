import React from "react";
import ToDoList from "./ToDoList";
// import Search from "./Search";
import "./App.css";
import axios from "axios";
import AddTask from "./AddTask";
import DialogBox from "./DialogBox";

class App extends React.Component {
  state = {
    todos: [],
    taskStatus: "",
    intervalIsSet: false,
    taskId: ""
  };

  componentDidMount() {
    this.getDataFromDB();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDB, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDB = () => {
    axios
      .get("http://localhost:4500/tasks")
      .then(res => this.setState({ todos: res.data }));
  };

  getTaskId = id => {
    this.setState({ taskId: id });

    document.querySelector("#edit-dialog-bg").style.display = "flex";
    document.querySelector("#edit-dialog").style.display = "flex";
  };

  render() {
    return (
      <div className="App">
        <div id="wrapper">
          <h1>
            {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
              new Date()
            )}
          </h1>
          <h5>
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }).format(new Date())}
          </h5>
          <p id="process-result"></p>
          {/* <Search /> */}
          <AddTask />
          <ToDoList todos={this.state.todos} getTaskId={this.getTaskId} />
          <DialogBox taskId={this.state.taskId} todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
