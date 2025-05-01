import axios from 'axios';

import api from '../../api/axios'; // Import the axios instance with interceptors

export const refService = {
//----------Domaine Crud -----------------
getAllDomaine: async () => {
    try {
      const response = await api.get('/domaine/getAll');
      console.log(response)
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getDomaineById: async (id) => {
    try {
      const response = await api.get(`/domaine/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },

  createDomaine: async (domaineData) => {
      const response = await api.post('/domaine', domaineData);
      return response.data;
   
  },

  updateDomaine: async (id, domaineData) => {
    try {
      const response = await api.put(`/domaine/${id}`, domaineData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  deleteDomaine: async (id) => {
    try {
      await api.delete(`/domaine/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },
  
//----------structure Crud -----------------
getAllStructure: async () => {
    try {
      const response = await api.get('/structure/getAll');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getStructureById: async (id) => {
    try {
      const response = await api.get(`/structure/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },

  createStructure: async (structureData) => {
    try {
      const response = await api.post('/structure/add', structureData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  updateStructure: async (id, structureData) => {
    try {
      const response = await api.put(`/structure/${id}`, structureData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  deleteStructure: async (id) => {
    try {
      await api.delete(`/structure/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },

 //----------profil Crud -----------------
getAllProfil: async () => {
    try {
      const response = await api.get('/profil/getAll');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getProfilById: async (id) => {
    try {
      const response = await api.get(`/profil/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },

  createProfil: async (profilData) => {
    try {
      const response = await api.post('/profil', profilData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  updateProfil: async (id, profilData) => {
    try {
      const response = await api.put(`/profil/${id}`, profilData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  deleteProfil: async (id) => {
    try {
      await api.delete(`/profil/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },
};