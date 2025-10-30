import React from "react";
import TaskItem from "./TaskItem";

/**
 * A component that displays the list of tasks.
 * @param {Object} props
 * @param {Array<Object>} props.tasks - The filtered list of tasks to display.
 * @param {Function} props.onToggleComplete - Handler to toggle a task's completion status.
 * @param {Function} props.onEdit - Handler to prepare a task for editing.
 * @param {Function} props.onDelete - Handler to delete a task.
 * @param {string} props.filter - The currently active filter status.
 */

function TaskList({ tasks, onToggleComplete, onEdit, onDelete, filter }) {
  // Edge Case: Empty list handling
  if (tasks.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md mt-6">
        <p className="text-gray-500 text-xl font-light">
          {filter === "All" && "Great job! Your task list is empty."}
          {filter === "Completed" && "No completed tasks yet."}
          {filter === "Pending" && "No pending tasks. Start adding some!"}
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
