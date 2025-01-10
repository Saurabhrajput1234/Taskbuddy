import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../../redux/actions/taskActions";
import "./TaskActions.css";

const TaskActions = ({ taskId }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!taskId) {
      console.error("Task ID is missing for toggle action.");
      return;
    }
    dispatch(toggleTask(taskId));
  };

  const handleDelete = () => {
    if (!taskId) {
      console.error("Task ID is missing for delete action.");
      return;
    }
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="task-actions">
      <button
        onClick={handleToggle}
        className="task-actions__button task-actions__toggle"
      >
        Toggle
      </button>
      <button
        onClick={handleDelete}
        className="task-actions__button task-actions__delete"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskActions;
