import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";

const TaskColumn = ({
  title,
  taskItems,
  moveTask,
  columnType,
  isTouchScreen,
  children,
}) => {
  const [color, setColor] = useState("from-gray-200");
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => moveTask(item.task, columnType),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  useEffect(() => {
    if (columnType === "todo") {
      setColor(isOver ? "from-teal-300" : "from-teal-400");
    } else if (columnType === "doing") {
      setColor(isOver ? "from-emerald-300" : "from-emerald-400");
    } else if (columnType === "done") {
      setColor(isOver ? "from-green-300" : "from-green-400");
    }
  });

  return (
    <div
      ref={drop}
      className={`relative flex-1 p-1 border-x-2 rounded-lg border-purple-50 w-full items-center justify-center bg-gradient-to-b ${color} to-purple-50`}
    >
      <h2
        className={`text-center w-fit py-1 px-6 text-purple-50 font-black tracking-wide text-sm cursor-default mb-2`}
      >
        {title}
      </h2>
      <div>
        {taskItems.map((task) => (
          <TaskItem isTouchScreen={isTouchScreen} key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
