import axios from 'axios';
import api from '../../../api/axios'; // Your configured axios instance

export const participationsService = {
  getParticipationsByFormation: async (formationId) => {
    try {
      const response = await api.get('/participations', {
        params: { formationId }
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Failed to fetch participations:', error);
      throw new Error(`Failed to fetch participations: ${errorMessage}`);
    }
  },
  getAllParticipation: async () => {
      try {
        const response = await api.get('/participations');
        console.log(response)
        console.log(response.data)
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch participation: ${error.message}`);
      }
    },

  takeAttendance: async (formationId, participationIds, hours) => {
    try {
      // Convert array to comma-separated string if needed by backend
      
      const response = await api.post('/participations/take_attendance', null, {
        params: {
          id_formation: formationId,
          ids_participants: participationIds,
          nb_heur: hours
        },
        paramsSerializer: {
          indexes: null ,// Important for array params
          encode: (value) => value  // Prevent URL encoding issues

        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Failed to record attendance:', error);
      throw new Error(errorMessage);
    }
  },

  refreshParticipations: async (formationId) => {
    try {
      const response = await api.get('/participations', {
        params: { formationId }
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Failed to refresh participations:', error);
      throw new Error(`Failed to refresh participations: ${errorMessage}`);
    }
  }
};