import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import NavigateHome from "../Buttons/NavigateHome";
import "./Calendar.css";

const Calendar = () => {
  const [newDateEvent, setNewDateEvent] = useState({ item: "", date: null });
  const [showForm, setShowForm] = useState(false);
  const [taskItems, setTaskItems] = useState(
    JSON.parse(localStorage.getItem("taskItems")) || []
  );
  const [calendarItems, setCalendarItems] = useState(
    JSON.parse(localStorage.getItem("calendarItems")) || []
  );
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const handleDateClick = (arg) => {
    setNewDateEvent(arg);
    setShowForm(true);
  };

  const handleAddEvent = () => {
    if (newDateEvent.item === "") {
      setError("Event name required");
    } else {
      const date = newDateEvent.date;
      const isoDate = date.toISOString();
      const newItem = { date: isoDate, item: newDateEvent.item };
      const updatedItems = [...calendarItems, newItem];
      setCalendarItems(updatedItems);
      localStorage.setItem("calendarItems", JSON.stringify(updatedItems));
      setNewDateEvent({ item: "", date: null });
      setShowForm(false);
    }
  };

  useEffect(() => {
    let calendarItemsArray = calendarItems.map((item) => ({
      title: item.item,
      start: item.date,
      color: "green",
    }));
    let taskItemsArray = taskItems.map((item) => ({
      title: item.name,
      start: item.completeBy,
      color: "blue",
    }));
    setEvents([...calendarItemsArray, ...taskItemsArray]);
  }, [taskItems, calendarItems]);

  return (
    <div className="bg-purple-50 pb-32 pt-24 min-h-dvh w-full flex justify-center align-center">
      <h1 className="fixed w-full text-xs bg-purple-50 bg-opacity-95 z-10 text-center top-2">
        CALENDAR
      </h1>
      <div className="max-w-4xl w-screen">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,today,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          events={events}
          dateClick={handleDateClick}
        />
      </div>
      {showForm && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div
            onKeyDown={(e) => (e.key === "Enter" ? handleAddEvent() : null)}
            className="bg-purple-50 p-8 rounded-lg shadow-lg max-w-md w-full"
          >
            <div className="mb-4">
              <input
                type="text"
                id="name"
                value={newDateEvent.item}
                onChange={(e) =>
                  setNewDateEvent({ ...newDateEvent, item: e.target.value })
                }
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter event name"
              />
            </div>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setNewDateEvent({ date: null, item: "" });
                  setShowForm(false);
                }}
                className="px-4 py-2 bg-red-400 text-gray-700 rounded-md hover:bg-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className={`px-4 py-2 rounded-md text-white ${
                  newDateEvent.item
                    ? "bg-blue-400 hover:bg-blue-500"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!newDateEvent.item}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full z-20 text-center fixed bottom-2">
        <NavigateHome />
      </div>
    </div>
  );
};

export default Calendar;
