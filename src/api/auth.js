import api from './axios';



export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
