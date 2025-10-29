import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import { 
  getAllTasks, 
  addTask as taskServiceAddTask, 
  updateTask as taskServiceUpdateTask, 
  deleteTask as taskServiceDeleteTask 
} from '../services/TaskService.js';
import { generateUniqueId, filterTasks } from '../utils/helpers.js';

/**
 * The main page component that manages state and logic for the Task Tracker.
 */
function Home() {
  // State for the main list of tasks
  const [tasks, setTasks] = useState([]);
  // State to hold the task currently being edited
  const [editingTask, setEditingTask] = useState(null);
  // State for the current filter(All, Completed, Pending)
  const [filter, setFilter] = useState('All');

  // Load tasks from localstorage on initial render
  useEffect(() => {
    const initialTasks = getAllTasks();
    setTasks(initialTasks);
  }, []); // Empty dependency array ensures this runs once

  /**
   * Handles saving a task (either adding a new one or updating an existing one).
   * @param {Object} taskData - The task object from the TaskForm.
   */
  const handleSaveTask = (taskData) => {
    let updateTasks;

    // Check if taskData contains an existing id(i.e., we are editing)
    if(editingTask && taskData.id === editingTask.id) {
      updateTasks = taskServiceUpdateTask(taskData);
      setEditingTask(null); // Clear editing state after update
    } else {
      // Adding a new task: assign a final unique ID
      const newTask = {
        ...taskData,
        id: generateUniqueId(),
      };
      updateTasks = taskServiceAddTask(newTask);
    }

    setTasks(updateTasks);
  };

  /**
  * Toggles the 'completed' status of a task by ID.
  * @param {number} taskId - The ID of the task to toggle.
  */
  const handleToggleComplete = useCallback((taskId) => {
    // Find the task to toggle
    const taskToToggle = tasks.find(task => task.id === taskId);

    if(taskToToggle) {
      // Create the updated task object
      const updatedTask = {
        ...taskToToggle,
        completed: !taskToToggle.completed,
      };
      // Update task in service and then update state
      const updateTasks = taskServiceUpdateTask(updatedTask);
      setTasks(updateTasks);

      // If the toggled task was being edited, clear the editing state
      if(editingTask && editingTask.id === taskId) {
        setEditingTask(null);
      }
    }
  }, [tasks, editingTask]);

  /**
  * Deletes a task by its ID.
  * @param {number} taskId - The ID of the task to delete.
  */
  const handleDeleteTask = useCallback((taskId) => {
    const updateTasks = taskServiceDeleteTask(taskId);
    setTasks(updateTasks);

    // If the deleted task was being edited, clear the editing state
    if(editingTask && editingTask.id === taskId) {
      setEditingTask(null);
    }
  }, [editingTask]);

  /**
  * Sets the task to be edited in the TaskForm.
  * @param {Object} task - The task object to edit.
  */
  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
  }, []);

  // Use memoization to efficiently filter tasks only when 'tasks' or 'filter' changes
  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filter);
  }, [tasks, filter]);

  // Tailwind classes for the filter buttons
  const filterButtonClass = "px-4 py-2 font-medium rounded-lg transition duration-150 ease-in-out shadow-sm";
  const activeFilterClass = "bg-blue-600 text-white hover:bg-blue-700";
  const inactiveFilterClass = "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300";

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            Task Tracker
          </h1>
        </header>

        {/* Task Form Component */}
        <TaskForm 
          onSave={handleSaveTask} 
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />

        {/* Filter Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          {['All', 'Pending', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`${filterButtonClass} ${filter === status ? activeFilterClass : inactiveFilterClass}`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Task List Component */}
        <div className="p-4 bg-white rounded-lg shadow-xl">
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            filter={filter}
          />
        </div>

      </div>
    </div>
  );
}

export default Home