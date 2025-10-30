// Key for localStorage
const TASKS_STORAGE_KEY = 'task_tracker_tasks';

/**
* Retrieves all tasks from localStorage.
* @returns {Array<Object>} The array of task objects.
*/
export const getAllTasks = () => {
  try {
    const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error retrieving tasks from localStorage:", error);
    return [];
  }
};

/**
* Saves the list of tasks to localStorage.
* @param {Array<Object>} tasks - The array of task objects to save.
*/
const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};

/**
* Adds a new task to localStorage.
* @param {Object} newTask - The task object to add. Must include a unique 'id'.
* @returns {Array<Object>} The updated list of tasks.
*/
export const addTask = (newTask) => {
  const tasks = getAllTasks();
  const updatedTasks = [newTask, ...tasks]; // Add new tasks to the top
  saveTasks(updatedTasks);
  return updatedTasks;
};

/**
* Updates an existing task in localStorage.
* @param {Object} updatedTask - The task object with updated properties.
* @returns {Array<Object>} The updated list of tasks.
*/
export const updateTask = (updatedTask) => {
  const tasks = getAllTasks();
  const updatedTasks = tasks.map(task => 
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(updatedTasks);
  return updatedTasks;
};

/**
* Deletes a task by its ID from localStorage.
* @param {number} taskId - The ID of the task to delete.
* @returns {Array<Object>} The updated list of tasks.
*/
export const deleteTask = (taskId) => {
  const tasks = getAllTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  saveTasks(updatedTasks);
  return updatedTasks;
};