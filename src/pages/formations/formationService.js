import axios from 'axios';

import api from '../../api/axios'; // Import the axios instance with interceptors

export const formationService = {
getAllFormation: async () => {
    try {
      const response = await api.get('/formation/getAll');
      console.log(response)
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getFormationById: async (id) => {
    try {
      const response = await api.get(`/formation/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },

 
  createFormation: async (fromationData) => {
    try {
      const response = await api.post('/formation/add', fromationData ,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  } ,

 /* updateFormation: async (id, fromationData) => {
    try {
      const response = await api.put(`/formation/${id}`, fromationData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },*/
  updateFormation : async (id, formData) => {
    try {
        const response = await api.put(`/formation/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update formation: ${error.response?.data?.message || error.message}`);
    }
} ,

  deleteFormation: async (id) => {
    try {
      await api.delete(`/formation/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },
  

};