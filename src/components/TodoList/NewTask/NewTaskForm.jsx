import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewTaskForm = ({ setNewTask, setShowForm, addTask, newTask }) => {
  const [showFields, setShowFields] = useState({
    tag: false,
    completeBy: false,
    notes: false,
  });
  const [error, setError] = useState("");

  const handleAddTask = () => {
    if (newTask.name === "") {
      setError("Task name is required");
    } else {
      addTask();
      setShowForm(false);
    }
  };

  const toggleField = (field) => {
    setShowFields({ ...showFields, [field]: !showFields[field] });
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div
        onKeyDown={(e) => (e.key === "Enter" ? handleAddTask() : null)}
        className="bg-purple-50 p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="mb-4">
          <input
            type="text"
            id="name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter task name"
          />
        </div>

        {showFields.tag && (
          <div className="mb-4">
            <input
              type="text"
              id="tag"
              value={newTask.tag}
              onChange={(e) => setNewTask({ ...newTask, tag: e.target.value })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter tag"
            />
          </div>
        )}

        {showFields.notes && (
          <div className="mb-4">
            <input
              type="text"
              id="notes"
              value={newTask.tag}
              onChange={(e) =>
                setNewTask({ ...newTask, notes: e.target.value })
              }
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter notes"
            />
          </div>
        )}

        {showFields.completeBy && (
          <div className="mb-4">
            <label
              htmlFor="completeBy"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <DatePicker
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mt-1 opacity-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              }
              showIcon
              placeholderText="  Select date"
              selected={
                newTask.completeBy ? new Date(newTask.completeBy) : null
              }
              onChange={(date) => setNewTask({ ...newTask, completeBy: date })}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
        <div className="flex w-full justify-start gap-2 pb-4 border-b-2">
          {!showFields.tag && (
            <button
              onClick={() => toggleField("tag")}
              className="mb-2 px-4 py-2 bg-lime-500 text-purple-50 font-bold tracking-wide rounded-md hover:bg-lime-600"
            >
              Add Tag
            </button>
          )}
          {!showFields.notes && (
            <button
              onClick={() => toggleField("notes")}
              className="mb-2 px-4 py-2 bg-teal-500 text-purple-50 font-bold tracking-wide rounded-md hover:bg-teal-600"
            >
              Add Notes
            </button>
          )}
          {!showFields.completeBy && (
            <button
              onClick={() => toggleField("completeBy")}
              className="mb-2 px-4 py-2 bg-emerald-500 text-purple-50 font-bold tracking-wide rounded-md hover:bg-emerald-600"
            >
              Add Due Date
            </button>
          )}
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => {
              setNewTask({ name: "", notes: "", completeBy: "", tag: "" });
              setShowForm(false);
            }}
            className="px-4 py-2 bg-red-400 text-gray-700 rounded-md hover:bg-red-500"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className={`px-4 py-2 rounded-md text-white ${
              newTask.name
                ? "bg-blue-400 hover:bg-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!newTask.name}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskForm;
