import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import Header from "../../components/Header/Header";
import TaskFilter from "../../components/TaskFilter/TaskFilter";
import TaskList from "../../components/TaskList/TaskList";
import BoardView from "../../components/BoardView/BoardView";
import AddTask from "../../components/AddTask/AddTask";
import { updateTaskStatus, deleteTask } from "../../redux/actions/taskActions";
import "./HomePage.css";

const HomePage = () => {
  const tasksFromStore = useSelector((state) => state.tasks.tasks || []);
  const [isModalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState("list");
  const [filters, setFilters] = useState({ query: "", status: "Todo" });
  const dispatch = useDispatch();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleMoveTask = (taskId, newStatus) => {
    const isCompleted = newStatus === "completed";
    dispatch(updateTaskStatus(taskId, isCompleted));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId)); // Delete task dispatched here
  };

  const filteredTasks = tasksFromStore.filter((task) => {
    const matchesQuery =
      filters.query === "" ||
      task.title.toLowerCase().includes(filters.query.toLowerCase());
    const matchesStatus =
      filters.status === "Todo" ||
      (filters.status === "completed" && task.completed) ||
      (filters.status === "InProgress" && !task.completed);
    return matchesQuery && matchesStatus;
  });

  const groupedTasks = {
    Todo: filteredTasks,
    InProgress: filteredTasks.filter((task) => !task.completed),
    completed: filteredTasks.filter((task) => task.completed),
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // Only handle drag-and-drop if the status changes
    if (source.droppableId !== destination.droppableId) {
      const newStatus = destination.droppableId;
      const isCompleted = newStatus === "completed";
      dispatch(updateTaskStatus(draggableId, isCompleted));
    }
  };

  return (
    <div className="home-page">
      <Header setView={setView} />
      <div className="Header-box" >
        <TaskFilter onFilterChange={setFilters} />
        <button className="add-task-button" onClick={handleOpenModal}>
          Add Task
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              ×
            </button>
            <AddTask closeModal={handleCloseModal} />
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-view">
          {view === "list" ? (
            <div className="task-sections">
              <div className="column-name">
                <h3>Task name</h3>
                <h3>Due on</h3>
                <h3>Task Status</h3>
                <h3>Task Category</h3>
              </div>
              <TaskList
                droppableId="Todo"
                groupName="Todo"
                tasks={groupedTasks.Todo}
              />
              <TaskList
                droppableId="InProgress"
                groupName="InProgress"
                tasks={groupedTasks.InProgress}
              />
              <TaskList
                droppableId="completed"
                groupName="Completed"
                tasks={groupedTasks.completed}
              />
            </div>
          ) : (
            <BoardView
              tasks={filteredTasks}
              onMoveTask={handleMoveTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default HomePage;
