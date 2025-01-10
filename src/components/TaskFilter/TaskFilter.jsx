import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./TaskFilter.css";

const TaskFilter = ({ onFilterChange }) => {
  const handleSearch = (query) => {
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      query,
    }));
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      status,
    }));
  };

  return (
    <div className="task-filter">
      <div className="Filter">
      <label htmlFor="status-filter" className="task-filter__label">
        Filter by :
      </label>
      <select
        id="status-filter"
        className="task-filter__select"
        onChange={handleStatusChange}
       
        aria-label="Filter tasks by status"
      >
        <option value="Todo">Todo</option>
        <option value="completed">Completed</option>
        <option value="InProgress">InProgress</option>
      </select>
      </div>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default TaskFilter;
