import axios from 'axios';

import api from '../../api/axios'; // Import the axios instance with interceptors

export const personnelService = {
//----------Employeur Crud -----------------
getAllEmployeurs: async () => {
    try {
      const response = await api.get('/employeur/getAll');
      console.log(response)
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getEmployeurById: async (id) => {
    try {
      const response = await api.get(`/employeur/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },

  createEmployeur: async (employeurData) => {
    try {
      const response = await api.post('/employeur/add', employeurData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  updateEmployeur: async (id, employeurData) => {
    try {
      const response = await api.put(`/employeur/${id}`, employeurData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  deleteEmployeur: async (id) => {
    try {
      await api.delete(`/employeur/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },
  
//----------Formateur Crud -----------------
getAllFormateurs: async () => {
    try {
      const response = await api.get('/formateur/getAll');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getFormateurById: async (id) => {
    try {
      const response = await api.get(`/formateur/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },

  createFormateur: async (formateurData) => {
    try {
      const response = await api.post('/formateur/add', formateurData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  updateFormateur: async (id, formateurData) => {
    try {
      const response = await api.put(`/formateur/${id}`, formateurData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  deleteFormateur: async (id) => {
    try {
      await api.delete(`/formateur/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },

 //----------Participant Crud -----------------
 getAllParticipants: async () => {
    try {
      const response = await api.get('/participant/getAll');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getParticipantById: async (id) => {
    try {
      const response = await api.get(`/participant/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },

  createParticipant: async (participantData) => {
    try {
      console.log(participantData)
      const response = await api.post('/participant/add', participantData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  updateParticipant: async (id, participantData) => {
    try {
      const response = await api.put(`/participant/${id}`, participantData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  deleteParticipant: async (id) => {
    try {
      await api.delete(`/participant/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },
};