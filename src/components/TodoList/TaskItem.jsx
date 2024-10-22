import { useDrag } from "react-dnd";
import { usePreview } from "react-dnd-preview";

const MobileTaskItemPreview = () => {
  const preview = usePreview();

  if (!preview.display) {
    return null;
  }
  const { itemType, item, style } = preview;

  return (
    <div className="z-20" type={itemType} style={{ ...style, width: "29%" }}>
      <div className="bg-white w-full p-2 rounded-lg shadow-md cursor-pointer opacity-100">
        <p
          className={`text-gray-800 tracking-wide text-sm hover:overflow-x-auto overflow-hidden text-wrap`}
        >
          {item.task.name}
        </p>
        <span className="text-gray-600 text-xs">
          {item.task.tag ? (
            item.task.tag
          ) : (
            <span className="italic">no tag</span>
          )}
        </span>
      </div>
    </div>
  );
};

const TaskItem = ({ task, isTouchScreen }) => {
  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: "task",
      item: { task },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  });

  return (
    <>
      <div
        role="Handle"
        ref={drag}
        className={`${
          isDragging ? "opacity-20" : ""
        } bg-white mb-2 px-4 py-2 shadow-md rounded-lg cursor-pointer opacity-100`}
      >
        <p
          className={`text-gray-800 tracking-wide text-sm hover:overflow-x-auto overflow-hidden text-wrap`}
        >
          {task.name}
        </p>
        <span className="text-gray-600 text-xs">
          {task.tag ? task.tag : <span className="italic">no tag</span>}
        </span>
      </div>
      {isTouchScreen && <MobileTaskItemPreview task={task} />}
    </>
  );
};

export default TaskItem;
