import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TodoList from "./components/TodoList";
import EnterScreen from "./components/EnterScreen";
import Calendar from "./components/Calendar";

const App = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };
    const usingTouchDevice = isTouchDevice();
    setIsTouchScreen(usingTouchDevice);
    if (isTouchScreen !== null) {
      setIsLoaded(true);
    }
  }, [isTouchScreen]);
  return (
    isLoaded && (
      <Router>
        <Routes>
          <Route path="/" element={<EnterScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/todolist"
            element={<TodoList isTouchScreen={isTouchScreen} />}
          />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Router>
    )
  );
};

export default App;
