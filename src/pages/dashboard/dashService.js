import axios from "axios";

import api from "../../api/axios"; // Import the axios instance with interceptors


export const dashService = {
  getDashboardData: async () => {
    try {
      const response = await api.get("/dash/stats");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },
  getActionLogs: async () => {
    try {
      const response = await api.get("/Historique");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getPrticpationStats: async () => {
    try {
      const response = await api.get("dash/stats/participations");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },
  getAllParticipants: async () => {
      try {
        const response = await api.get('/dash/participants');
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
    },
   getRecentrParticipations:async () => {
    try {
      const response = await api.get('/participations?recentParticipations=true&limit=10');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    } }
};
