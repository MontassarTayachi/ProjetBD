export default function ConfirmationModal({ message, itemId, onConfirm, onCancel }) {
  const confirmAction = () => {
    onConfirm(itemId);
  };
  
  const cancelAction = () => {
    onCancel();
  };
  
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
      <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full p-8"> 
      <div className="text-xl montserrat-700 text-[#1d2736]">Êtes-vous sûr ?</div>
    
      <div className="py-6 text-gray-700 montserrat-semi">
        <p>Le {message} {itemId} sera <span className="text-red-700">supprimé.</span> Cette action est irréversible.</p>
      </div>
    
      {/* Pied de modal */}
      <div className="flex justify-end">
        <button 
        onClick={cancelAction} 
        className="px-4 py-2 mr-2 text-[#1d2736] bg-white border border-[#1d2736] rounded-lg focus:outline-none sm:mr-4"
        >
        Annuler
        </button>
        <button 
        onClick={confirmAction} 
        className="px-4 py-2 text-white bg-[#1d2736] rounded-lg hover:bg-red-700 focus:outline-none sm:px-6"
        >
        Oui, je suis sûr
        </button>
      </div>
      </div>
    </div>
    </div>
  );
  }