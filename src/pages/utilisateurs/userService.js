import axios from 'axios';

import api from '../../api/axios'; // Import the axios instance with interceptors


export const userService = {

  // User CRUD operations
  createUser: async (formData) => {
    try {
      const response = await api.post('/user/add', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // Just rethrow original error object
    }
  } ,
  
  getAllUsers: async () => {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getUserById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },

 

  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/user/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/user/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },
   // Role operations
   getAllRoles: async () => {
    try {
      const response = await api.get('/user/allRole'); // Assuming you have this endpoint
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch roles: ${error.message}`);
    }
  },

  createRole: async (roleData) => {
    try {
      const response = await api.post('/user/addRole', roleData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create role: ${error.message}`);
    }
  }


 
};