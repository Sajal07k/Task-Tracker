/**
* Generates a unique ID (timestamp-based for simplicity).
* @returns {number} A unique ID.
*/
export const generateUniqueId = () => {
  return Date.now();
};

/**
* Filters a list of tasks based on their completion status.
* @param {Array<Object>} tasks - The array of task objects.
* @param {string} filter - The filter status ('All', 'Completed', 'Pending').
* @returns {Array<Object>} The filtered array of tasks.
*/
export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case 'Completed':
      return tasks.filter(task => task.completed);
    case 'Pending':
      return tasks.filter(task => !task.completed);
    case 'All':
    default:
      return tasks;
  }
};