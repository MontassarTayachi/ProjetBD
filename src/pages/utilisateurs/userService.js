import axios from 'axios';

import api from '../../api/axios'; // Import the axios instance with interceptors

// Create axios instance with base config

export const userService = {
  // User CRUD operations
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

  createUser: async (userData) => {
    try {
      const response = await api.post('/addUser', userData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },

 
};