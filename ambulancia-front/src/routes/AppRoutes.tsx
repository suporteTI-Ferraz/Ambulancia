import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import PageTitle from '../components/PageTitle';
import GerenciarFuncionario from '../pages/GerenciarFuncionario';
import GerenciarPaciente from '../pages/GerenciarPaciente';
import GerenciarMotorista from '../pages/GerenciarMotorista';
import GerenciarVeiculo from '../pages/GerenciarVeiculo';
import GerenciarHospital from '../pages/GerenciarHospital';
import GerenciarAgendarDia from '../pages/GerenciarAgendarDia';
import GerenciarAgendamento from '../pages/GerenciarAgendamento';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CriarFicha from '../pages/CriarFicha';
import Relatorios from '../pages/Relatorios';
import RelatoriosDashboard from '../pages/DashboardRelatorios';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rotas públicas com redirecionamento se autenticado */}
        
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<><PageTitle /><Login /></>} />
        </Route>

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<><Dashboard /></>} />
          <Route path="/gerenciar-funcionarios" element={<><GerenciarFuncionario /></>} />
          <Route path="/gerenciar-pacientes" element={<><PageTitle /><GerenciarPaciente /></>} />
          <Route path="/gerenciar-motoristas" element={<><PageTitle /><GerenciarMotorista /></>} />
          <Route path="/gerenciar-ambulancias" element={<><PageTitle /><GerenciarVeiculo /></>} />
          <Route path="/gerenciar-hospitais" element={<><PageTitle /><GerenciarHospital /></>} />
          <Route path="/gerenciar-agendamentos/:agendaId" element={<><PageTitle /><GerenciarAgendamento /></>} />
          <Route path="/gerenciar-agendamentos" element={<><PageTitle /><GerenciarAgendarDia /></>} />
          <Route path="/criar-ficha" element={<><PageTitle /><CriarFicha /></>} />
          <Route path="/relatorios" element={<><PageTitle /><Relatorios /></>} />
          <Route path="/dashboard-relatorios" element={<><PageTitle /><RelatoriosDashboard /></>} />
          {/* <Route path="/header" element={<><PageTitle /><Header /></>} /> */}



        </Route>

        {/* Rota de fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default AppRoutes;
