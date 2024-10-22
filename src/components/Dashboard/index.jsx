import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-purple-50 w-screen">
      <h1 className="absolute w-full text-center top-5 text-xs text-gray-700 opacity-50 font-semibold tracking-widest">
        PRODUCTIVITY
      </h1>
      <div className="h-screen flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-2 gap-1 py-20 px-2 text-3xl ">
        <button
          onClick={() => navigate("/todolist")}
          className="hover:text-lime-900 hover:drop-shadow-2xl bg-lime-500 hover:bg-lime-400 border-4 border-white text-white font-semibold py-2 px-4 rounded h-1/4 sm:h-full shadow-lg transition-all duration-400"
        >
          Todo List
        </button>
        <button
          onClick={() => navigate("/calendar")}
          className="hover:text-emerald-900 hover:drop-shadow-2xl  bg-emerald-500 hover:bg-emerald-400 border-white border-4 text-white font-semibold py-2 px-4 rounded h-1/4 sm:h-full shadow-lg transition-all duration-400"
        >
          Calendar
        </button>
        <button className="hover:text-green-900 hover:drop-shadow-2xl bg-green-500 hover:bg-green-400 border-4 border-white text-white text-sm italic font-semibold py-2 px-4 rounded h-1/4 sm:h-full shadow-lg transition-all duration-400">
          {"{ future feature }"}
        </button>
        <button className="hover:text-teal-900 hover:drop-shadow-2xl  bg-teal-500 hover:bg-teal-400 border-4 border-white text-white text-sm italic font-semibold py-2 px-4 rounded h-1/4 sm:h-full shadow-lg transition-all duration-400">
          {"{ future feature }"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
