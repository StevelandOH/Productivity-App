import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import TrashItems from "./TrashItems";
import TrashMenu from "./TrashMenu";

const TrashBin = ({
  moveTask,
  columnType,
  taskItems,
  setTaskItems,

  setOver,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [hover, setHover] = useState(false);
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => moveTask(item.task, columnType),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    setOver(isOver);
  }, [isOver]);
  const emptyTrash = () => {
    localStorage.setItem(
      "taskItems",
      JSON.stringify(
        JSON.parse(localStorage.getItem("taskItems")).filter(
          (item) => item.status !== "trash"
        )
      )
    );
    setTaskItems(JSON.parse(localStorage.getItem("taskItems")) || []);
    setShowMenu(false);
  };

  const restoreItems = () => {
    const updatedTasks = JSON.parse(localStorage.getItem("taskItems")).map(
      (item) => (item.status === "trash" ? { ...item, status: "todo" } : item)
    );
    localStorage.setItem("taskItems", JSON.stringify(updatedTasks));
    setTaskItems(updatedTasks);
    setShowMenu(false);
  };

  return (
    <>
      {!isOver && (
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setShowMenu(true)}
          ref={drop}
          className={`text-teal-500 bg-gray-50 border-4 border-white shadow-md drop-shadow-sm rounded-full p-4 hover:drop-shadow-xl hover:shadow-lg transition-all duration-300 ease-in-out`}
        >
          <svg
            strokeWidth={1}
            stroke="currentColor"
            fill="currentColor"
            ref={drop}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-2 -22 30 30"
            className={` size-8 ${hover ? "animate-pulse" : null}`}
          >
            <g
              className={`${
                taskItems.length ? "opacity-100" : "opacity-0"
              } transition-all duration-400`}
            >
              <TrashItems />
            </g>
            <text className="text-xl" x={3} y={2}>
              🗑️
            </text>
          </svg>
        </button>
      )}
      {isOver && (
        <>
          <div
            className={`text-teal-500 bg-gray-50 border-4 border-white shadow-md drop-shadow-sm rounded-full p-4 hover:drop-shadow-xl hover:shadow-lg transition-all duration-300 ease-in-out opacity-0`}
          >
            <svg
              strokeWidth={1}
              stroke="currentColor"
              fill="currentColor"
              ref={drop}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2 -22 30 30"
              className={` size-8 ${hover ? "animate-pulse" : null}`}
            >
              <g
                className={`${
                  taskItems.length ? "opacity-100" : "opacity-0"
                } transition-all duration-400`}
              >
                <TrashItems />
              </g>
              <text className="text-xl" x={3} y={2}>
                🗑️
              </text>
            </svg>
          </div>
          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setShowMenu(true)}
            ref={drop}
            className={`text-teal-500 bg-gray-50 border-4 border-white shadow-md drop-shadow-sm rounded-full p-4 hover:drop-shadow-xl hover:shadow-lg transition-all duration-300 ease-in-out ${
              isOver ? "fixed z-10 p-6 -mt-6" : ""
            }`}
          >
            <svg
              strokeWidth={1}
              stroke="currentColor"
              fill="currentColor"
              ref={drop}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2 -22 30 30"
              className={`${
                hover ? "animate-pulse" : null
              } transition-all duration-1000 ease-in-out ${
                isOver ? "animate-bounce size-10" : "size-8"
              }`}
            >
              <g
                className={`${
                  taskItems.length ? "opacity-100" : "opacity-0"
                } transition-all duration-400`}
              >
                <TrashItems />
              </g>
              <text className="text-xl" x={3} y={2}>
                🗑️
              </text>
            </svg>
          </button>
        </>
      )}

      {showMenu && (
        <TrashMenu
          taskItems={taskItems}
          onEmptyTrash={emptyTrash}
          onRestoreItems={restoreItems}
          setShowMenu={setShowMenu}
        />
      )}
    </>
  );
};

export default TrashBin;
