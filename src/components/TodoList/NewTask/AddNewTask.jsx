import { useState } from "react";

const AddNewTask = ({ setShowForm }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-teal-500 bg-gray-50 border-4 border-white shadow-md drop-shadow-sm rounded-full p-4 hover:drop-shadow-xl hover:shadow-lg transition-all duration-300 ease-in-out"
      onClick={() => setShowForm(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className={`${
          hover ? "animate-pulse" : ""
        } size-8 transition-all ease-in-out`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
};

export default AddNewTask;
