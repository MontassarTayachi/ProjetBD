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
};
