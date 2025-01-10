import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./BoardView.css";

const BoardView = ({ tasks, onMoveTask, onDeleteTask }) => {
  const groupedTasks = {
    Todo: tasks,
    InProgress: tasks.filter((task) => !task.completed),
    completed: tasks.filter((task) => task.completed),
  };

  return (
    <div className="board-view">
      <div className="board-columns">
        {Object.entries(groupedTasks).map(([key, groupTasks]) => (
          <Droppable key={key} droppableId={key}>
            {(provided) => (
              <div
                className="board-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {" "}
                <div className="title-group">
                  <h2 className="column-title">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h2>
                </div>
                {groupTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="task-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="task-details">
                          <h3 className="task-title">{task.title}</h3>
                          <p className="task-description">{task.description}</p>
                        </div>
                        <div className="task-actions">
                          <button
                            className="move-button"
                            onClick={() =>
                              onMoveTask(
                                task.id,
                                key === "InProgress"
                                  ? "completed"
                                  : "InProgress"
                              )
                            }
                          >
                            {key === "InProgress"
                              ? "Move to Completed"
                              : "Move to InProgress"}
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
};

export default BoardView;
