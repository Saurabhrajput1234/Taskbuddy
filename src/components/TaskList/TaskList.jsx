import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";

const TaskList = ({ tasks = [], droppableId, groupName }) => {
  const taskCount = tasks.length;

  return (
    <div className="task-list-section">
      <div className="task-group">
        <div className="group-heading">
          <h2 className="task-group-name">
            {groupName} ({taskCount})
          </h2>
        </div>

        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div
              className="task-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      className="task-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem task={task} />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TaskList;
