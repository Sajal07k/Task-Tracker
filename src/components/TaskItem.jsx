import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

/**
* Represents a single task item in the list.
* @param {Object} props
* @param {Object} props.task - The task object (id, description, completed).
* @param {Function} props.onToggleComplete - Function to toggle task completion status.
* @param {Function} props.onEdit - Function to set the task for editing.
* @param {Function} props.onDelete - Function to delete the task.
*/
function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const { id, description, completed } = task;

  return (
    <li
      className={`flex items-center justify-between p-4 mb-3 rounded-xl transition duration-300 ease-in-out 
        ${completed 
          ? 'bg-white border-l-4 border-gray-300 opacity-70 shadow-inner' 
          : 'bg-white border border-gray-200 hover:shadow-md hover:scale-[1.01] hover:border-indigo-300'
        }`}
    >
      <div className="flex items-center flex-grow min-w-0">
        {/* Completion Checkbox */}
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleComplete(id)}
          className="mr-4 w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer transition duration-150"
        />

        {/* Task Description */}
        <span
          className={`text-base font-medium break-words w-full ${completed ? 'line-through text-gray-500 italic' : 'text-gray-800'}`}
        >
          {description}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 ml-4">
        {/* Edit Button */}
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-indigo-500 rounded-full hover:bg-indigo-100 transition duration-150 ease-in-out disabled:opacity-30 disabled:hover:bg-transparent"
          title="Edit Task"
          disabled={completed} // Cannot edit a completed task
        >
          <FaEdit className="w-5 h-5" />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(id)}
          className="p-2 text-red-600 rounded-full hover:bg-red-100 transition duration-150 ease-in-out"
          title="Delete Task"
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;