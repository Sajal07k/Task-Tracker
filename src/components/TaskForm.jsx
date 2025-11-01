import React, { useEffect, useState } from "react";

/**
 * A form component for adding and editing tasks.
 * @param {Object} props
 * @param {Function} props.onSave - Function called on form submission (add or update).
 * @param {Object | null} props.editingTask - The task object currently being edited, or null.
 * @param {Function} props.setEditingTask - Function to clear the editing state.
 */
function TaskForm({ onSave, editingTask, setEditingTask }) {
  // State for the task input
  const [description, setDescription] = useState("");
  // State for error message
  const [error, setError] = useState("");

  // Effect to populate form when an editingTask is passed
  useEffect(() => {
    if (editingTask) {
      setDescription(editingTask.description);
    } else {
      setDescription("");
    }
  }, [editingTask]);

  /**
   * Handles the form submission for adding or updating a task.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedDescription = description.trim();

    // Edge Case: Empty input
    if (!trimmedDescription) {
      setError("Task description cannot be empty.");
      return;
    }

    const taskData = {
      description: trimmedDescription,
      // If editing, keep existing id and completed status
      ...(editingTask
        ? {
            id: editingTask.id,
            completed: editingTask.completed,
          }
        : {
            // If new, generate a temporary id
            id: Date.now(),
            completed: false,
          }),
    };

    onSave(taskData);
    setDescription("");
    setError("");
    // Clear editing state after save
    if (editingTask) {
      setEditingTask(null);
    }
  };

  /**
   * Clears the form and editing state.
   */
  const handleCancelEdit = () => {
    setDescription("");
    setError("");
    setEditingTask(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-xl shadow-lg mb-6 w-full mx-auto border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Task Input */}
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError(""); // Clear error on change
          }}
          placeholder="What needs to be done?"
          className={`flex-grow p-3 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
        />

        {/* Buttons */}
        <div className="flex space-x-2">
          {/* Save/Add Button */}
          <button
            type="submit"
            className="px-4 py-3 min-w-[100px] bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-200 ease-in-out disabled:opacity-50 disabled:shadow-none"
            disabled={!description.trim()}
          >
            {editingTask ? "Save" : "Add"}
          </button>

          {/* Cancel Button (only shown when editing) */}
          {editingTask && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-3 min-w-[100px] bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition duration-200 ease-in-out"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-red-500 text-sm font-medium">{error}</p>
      )}
    </form>
  );
}

export default TaskForm;
