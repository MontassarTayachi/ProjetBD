import React, { useState } from "react";
import { personnelService } from "./personnelService";

export default function FormationPopup({ formations, onClose , participantId }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };
  const handleConfirm = async () => {
    try {
      const requests = selectedIds.map(async (formationId) => {
        const participationData = {
          participant: { id: participantId },
          formation: { id: formationId },
          nombreHeures: 0 
        };
        console.log("Participation Data:", participationData);
        const response = await personnelService.createParticipation(participationData);
  
        // No need to manually check status or ok
        return response; // response.data already from createParticipation
      });
  
      await Promise.all(requests);
      onClose();
    } catch (error) {
      console.error("Error creating participations:", error.message);
      // You could optionally show a user-friendly message here
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg h-[80vh] flex flex-col">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Sélectionner les formations</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Liste des formations avec défilement */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          <div className="space-y-2">
            {formations.map((formation) => (
              <label 
                key={formation.id}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(formation.id)}
                  onChange={() => handleCheckboxChange(formation.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-3 text-gray-700">{formation.titre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Boutons fixes en bas */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              className="px-5 py-2.5 bg-[#947ebc] hover:bg-[#7a6699] text-white rounded-lg transition-colors duration-200"
            >
              Confirmer la sélection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}