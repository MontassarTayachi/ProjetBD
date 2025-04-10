import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser,  logout as authLogout } from '../api/auth';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post("/api/auth/login", formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setUser(getCurrentUser());
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
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
