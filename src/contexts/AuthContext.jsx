import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser,  logout as authLogout } from '../api/auth';
import axios from 'axios';
import api from '../api/axios'; // Import the axios instance with interceptors
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Fetch = async () => {
    try {
      const rep =await api.get('/user/allRole');
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    console.log("Fetching user data...");
    const fetchData = async () => {
      const storedUser = getCurrentUser();
      await Fetch();
      setUser(storedUser);
      setLoading(false);
    };
    fetchData();
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post("/api/auth/login", formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setUser(getCurrentUser());
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
