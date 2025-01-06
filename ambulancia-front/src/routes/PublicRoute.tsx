import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/profile" replace />; // Redireciona para a rota protegida
  }

  return <Outlet />; // Renderiza o conteúdo da rota pública
};

export default PublicRoute;
