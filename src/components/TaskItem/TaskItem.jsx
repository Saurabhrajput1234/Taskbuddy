import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../redux/actions/taskActions";
import TaskViewModal from "../TaskViewModal/TaskViewModal";
import "./TaskItem.css";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask(updatedTask)); 
    handleCloseModal();
  };

  const handleTaskClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div
        className={`task-item ${task.completed ? "completed" : ""}`}
        onClick={handleTaskClick}
      >
        <div className="task-columns">
          <div className="task-column">
            <p>{task.title}</p>
          </div>
          <div className="task-column info-hide">
            <p>{task.dueDate}</p>
          </div>
          <div className="task-column info-hide">
            <p> {task.status}</p>
          </div>
          <div className="task-column info-hide">
            <p> {task.category}</p> 
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TaskViewModal
          task={task}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdateTask}
        />
      )}
    </>
  );
};

export default TaskItem;
