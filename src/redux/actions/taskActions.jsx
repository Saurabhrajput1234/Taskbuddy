export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const UPDATE_TASK_ORDER = "UPDATE_TASK_ORDER";

export const updateTaskOrder = (tasks) => ({
  type: UPDATE_TASK_ORDER,
  payload: tasks,
});

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const updateTask = (task) => {
  return {
    type: UPDATE_TASK,
    payload: task,
  };
};

export const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    payload: taskId,
  };
};

export const updateTaskStatus = (taskId, completed) => {
  return {
    type: UPDATE_TASK_STATUS,
    payload: { id: taskId, completed },
  };
};

export const toggleTask = (taskId) => (dispatch, getState) => {
  const state = getState();
  const task = state.tasks?.tasks.find((t) => t.id === taskId);

  if (!task) {
    console.error(`Task with ID ${taskId} not found.`);
    return;
  }

  dispatch(updateTaskStatus(taskId, !task.completed));
};
