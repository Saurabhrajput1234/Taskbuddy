import React from "react";
import TaskList from "../TaskList/TaskList";
import "./ListView.css";

const ListView = ({ tasks }) => {
  return (
    <div className="list-view">
      <h2>List View</h2>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default ListView;
