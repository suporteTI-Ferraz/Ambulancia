import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Login from '../pages/Login';
import Perfil from '../pages/Perfil';
import Dashboard from '../pages/Dashboard';
import PageTitle from '../components/PageTitle'; // Importando o PageTitle

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas com redirecionamento se autenticado */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<><PageTitle /><Login /></>} />
        </Route>

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<><PageTitle /><Perfil /></>} />
          <Route path="/dashboard" element={<><PageTitle /><Dashboard /></>} />
        </Route>

        {/* Rota de fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
