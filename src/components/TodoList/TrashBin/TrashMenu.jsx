const TrashMenu = ({
  onEmptyTrash,
  onRestoreItems,
  setShowMenu,
  taskItems,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Trash Bin Options</h2>
        {taskItems.length > 0 ? (
          <>
            <button
              onClick={onEmptyTrash}
              className="w-full bg-red-500 text-white py-2 mb-2 rounded-lg"
            >
              Empty Trash
            </button>
            <button
              onClick={onRestoreItems}
              className="w-full bg-blue-500 text-white py-2 mb-2 rounded-lg"
            >
              {`Restore (${taskItems.length}) Items`}
            </button>
            <button
              onClick={() => setShowMenu(false)}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p className="text-red-400 font-bold w-full text-center mb-4">
              Trash is Empty
            </p>
            <button
              onClick={() => setShowMenu(false)}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg"
            >
              Okay
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TrashMenu;
