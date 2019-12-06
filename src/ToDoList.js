import React from "react";
import Item from "./Item";
import PropTypes from "prop-types";

const ToDoList = props => {
  return (
    <div id="task-container">
      <ul>
        {props.todos.map(task => (
          <Item key={task.id} task={task} {...props} />
        ))}
      </ul>
    </div>
  );
};

ToDoList.propTypes = {
  todos: PropTypes.array.isRequired
  // toggleComplete: PropTypes.func.isRequired
};

export default ToDoList;
