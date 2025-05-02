

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { participationsService } from './participationsService';
import { useToast } from '../../../contexts/ToastContext'; // Import the toast hook

const Participation = () => {
  const { formationId } = useParams();
  const [participations, setParticipations] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState(new Set());
  const [hours, setHours] = useState('');
  const [remainingHours, setRemainingHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast(); // Get the toast function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await participationsService.getParticipationsByFormation(formationId);
        setParticipations(data);
        setRemainingHours(data[0]?.formation.nbHeuresRestantes || 0);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Loading Error',
          message: err.message || 'Failed to load participants'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [formationId, addToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const participantIds = Array.from(selectedParticipants);
      
      await participationsService.takeAttendance(
        formationId,
        participantIds,
        hours
      );

      // Refresh data
      const updatedData = await participationsService.refreshParticipations(formationId);
      setParticipations(updatedData);
      setRemainingHours(updatedData[0]?.formation.nbHeuresRestantes || 0);

      setSelectedParticipants(new Set());
      setHours('');
      
      // Show success toast
      addToast({
        type: 'success',
        title: 'Success!',
        message: 'Attendance recorded successfully!'
      });
      
    } catch (err) {
      // Show error toast
      addToast({
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to record attendance'
      });
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {participations[0]?.formation.titre} Attendance
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-100 px-4 py-2 rounded-lg">
              <span className="font-semibold text-blue-800">
                Remaining Hours: {remainingHours}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {participations.map((participation) => {
                const participantId = participation.participant.id;
                return (
                  <div 
                    key={participation.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedParticipants.has(participantId)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => {
                      const newSelection = new Set(selectedParticipants);
                      newSelection.has(participantId) 
                        ? newSelection.delete(participantId)
                        : newSelection.add(participantId);
                      setSelectedParticipants(newSelection);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedParticipants.has(participantId)}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300"
                        onChange={() => {}}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {participation.participant.prenom} {participation.participant.nom}
                        </h3>
                        <p className="text-sm text-gray-600">{participation.participant.email}</p>
                        <div className="mt-2 text-sm">
                          <span className="text-gray-500">Total Hours: </span>
                          <span className="font-medium">{participation.nombreHeures}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours to Add
                </label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  min="1"
                  max={remainingHours}
                  className="w-full sm:w-48 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter hours"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!hours || selectedParticipants.size === 0 || hours > remainingHours}
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Record Attendance
              </button>
            </div>

            {hours > remainingHours && (
              <p className="mt-2 text-red-500 text-sm">
                Cannot exceed remaining hours ({remainingHours} hours available)
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Participation;