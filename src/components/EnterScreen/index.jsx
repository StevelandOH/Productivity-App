import React from "react";
import { useNavigate } from "react-router-dom";

const EnterScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-500 text-purple-50 font-bold py-2 px-4 rounded"
      >
        Enter
      </button>
    </div>
  );
};

export default EnterScreen;
