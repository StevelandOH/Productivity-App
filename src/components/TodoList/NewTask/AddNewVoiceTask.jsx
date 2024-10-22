import { useState } from "react";

const AddNewVoiceTask = ({ isListening, handleVoiceInput }) => {
  return (
    <button
      onClick={() =>
        isListening ? handleVoiceInput(true) : handleVoiceInput()
      }
      className={` text-blue-400 hover:text-blue-500 p-4 rounded-full transition-all duration-400 ${
        isListening ? "animate-pulse" : ""
      }`}
    >
      {isListening ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          viewBox="0 -1 24 24"
          strokeWidth={2}
          stroke="white"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -1 24 24"
          fill="currentColor"
          className={`size-10`}
        >
          <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
          <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
        </svg>
      )}
    </button>
  );
};

export default AddNewVoiceTask;
