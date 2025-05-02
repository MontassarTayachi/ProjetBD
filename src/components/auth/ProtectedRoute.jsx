import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import React from 'react';

const ProtectedRoute = ({ roles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (roles && (!user || !roles.includes(user.role))) {
        navigate('/');
      }
    }
  }, [isAuthenticated, loading, roles, user, navigate]);

  // Optionnel : afficher un loader pendant le chargement
  if (loading) return <div>Chargement...</div>;

  return <Outlet />;
};

export default ProtectedRoute;
