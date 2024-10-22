import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";
import TrashBin from "./TrashBin";
import NewTaskForm from "./NewTask/NewTaskForm";
import HomeButton from "../Buttons/NavigateHome";
import VoiceNewTaskButton from "./NewTask/AddNewVoiceTask";
import AddNewTask from "./NewTask/AddNewTask";
import { TouchBackend } from "react-dnd-touch-backend";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const COLUMN_TYPES = {
  TODO: "todo",
  DOING: "doing",
  DONE: "done",
  TRASH: "trash",
};

const TodoList = ({ isTouchScreen }) => {
  const [over, setOver] = useState(false);
  const [taskItems, setTaskItems] = useState(
    JSON.parse(localStorage.getItem("taskItems")) || []
  );
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    notes: "",
    completeBy: "",
    tag: "",
  });
  const [isListening, setIsListening] = useState(false);
  const [tags, setTags] = useState(new Set());
  const [selectedTag, setSelectedTag] = useState("all");
  const [showTrashMenu, setShowTrashMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem("taskItems", JSON.stringify(taskItems));
    const newTags = new Set(taskItems.map((task) => task.tag));
    setTags(newTags);
  }, [taskItems]);

  const addTask = () => {
    const task = { ...newTask, id: Date.now(), status: COLUMN_TYPES.TODO };
    setTaskItems([...taskItems, task]);
    setNewTask({ name: "", notes: "", completeBy: "", tag: "" });
    setShowForm(false);
  };

  const moveTask = (task, newStatus) => {
    setTaskItems((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
    );
  };

  const taskItemsByColumn = {
    [COLUMN_TYPES.TODO]: taskItems.filter(
      (task) =>
        task.status === COLUMN_TYPES.TODO &&
        (selectedTag === "all" || task.tag === selectedTag)
    ),
    [COLUMN_TYPES.DOING]: taskItems.filter(
      (task) =>
        task.status === COLUMN_TYPES.DOING &&
        (selectedTag === "all" || task.tag === selectedTag)
    ),
    [COLUMN_TYPES.DONE]: taskItems.filter(
      (task) =>
        task.status === COLUMN_TYPES.DONE &&
        (selectedTag === "all" || task.tag === selectedTag)
    ),
    [COLUMN_TYPES.TRASH]: taskItems.filter(
      (task) =>
        task.status === COLUMN_TYPES.TRASH &&
        (selectedTag === "all" || task.tag === selectedTag)
    ),
  };

  const handleVoiceInput = (stop = false) => {
    if (stop) {
      setIsListening(false);
      recognition.stop();
      return;
    }
    if (!recognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    setIsListening(true);

    recognition.start();
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setNewTask({
        name: spokenText,
        notes: "",
        tag: "",
        completeBy: "",
      });
      setTaskItems([
        ...taskItems,
        {
          id: Date.now(),
          name: spokenText,
          status: COLUMN_TYPES.TODO,
          tag: "",
        },
      ]);
      setIsListening(false);
      setNewTask({
        name: "",
        notes: "",
        completeBy: "",
        tag: "",
        completeBy: "",
      });
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
    };
  };

  return (
    <div className="bg-purple-50 w-screen">
      <h1 className="absolute w-full text-center top-5 text-xs text-gray-700 opacity-50 font-semibold tracking-widest">
        TO-DO
      </h1>
      <div className="absolute text-xs w-full top-11 text-center mb-12 text-gray-500">
        <label htmlFor="tags" className="mr-2 ">
          Filter by tag:
        </label>
        <select
          id="tags"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="p-2 border rounded-xl min-w-44 bg-gray-100 cursor-pointer"
        >
          <option value="all">All</option>
          {Array.from(tags).map((tag, i) => (
            <option key={i} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <DndProvider
        usePreview
        enableTouchEvents
        backend={isTouchScreen ? TouchBackend : HTML5Backend}
      >
        <div
          onClick={() => {
            if (showTrashMenu === true) {
              setShowTrashMenu(false);
            }
          }}
          className="py-20 px-2 h-screen max-w-screen w-full flex flex-col items-center justify-center bg-purple-50 font-roboto"
        >
          <div className="grid grid-cols-[33%,33%,33%] w-full max-w-2xl h-full">
            <TaskColumn
              isTouchScreen={isTouchScreen}
              title="todo"
              taskItems={taskItemsByColumn[COLUMN_TYPES.TODO]}
              moveTask={moveTask}
              columnType={COLUMN_TYPES.TODO}
            />
            <TaskColumn
              isTouchScreen={isTouchScreen}
              title="doing"
              taskItems={taskItemsByColumn[COLUMN_TYPES.DOING]}
              moveTask={moveTask}
              columnType={COLUMN_TYPES.DOING}
            />
            <TaskColumn
              isTouchScreen={isTouchScreen}
              title="done"
              taskItems={taskItemsByColumn[COLUMN_TYPES.DONE]}
              moveTask={moveTask}
              columnType={COLUMN_TYPES.DONE}
            />
          </div>

          {showForm && (
            <NewTaskForm
              setNewTask={setNewTask}
              setShowForm={() => setShowForm()}
              addTask={addTask}
              newTask={newTask}
            />
          )}

          <div className="fixed bottom-2 flex w-full max-w-3xl justify-between items-start">
            {/* <VoiceNewTaskButton
              handleVoiceInput={handleVoiceInput}
              isListening={isListening}
            /> */}
            <TrashBin
              setOver={() => setOver()}
              showTrashMenu={showTrashMenu}
              setShowTrashMenu={setShowTrashMenu}
              setTaskItems={setTaskItems}
              moveTask={moveTask}
              columnType={COLUMN_TYPES.TRASH}
              taskItems={taskItemsByColumn[COLUMN_TYPES.TRASH]}
            />
            <HomeButton />
            <AddNewTask setShowForm={setShowForm} />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default TodoList;
