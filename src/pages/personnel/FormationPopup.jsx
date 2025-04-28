import React, { useState } from "react";

export default function FormationPopup({ formations,  onClose }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((formationId) => formationId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleConfirm = () => {
    //onConfirm(selectedIds); // send back to parent only on confirm
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Select Formations</h2>

        <div className="space-y-2">
          {formations.map((formation) => (
            <div key={formation.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedIds.includes(formation.id)}
                onChange={() => handleCheckboxChange(formation.id)}
                className="mr-2"
              />
              <span>{formation.titre}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
