import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import CriarFicha from '../pages/CriarFicha';
import Dashboard from '../pages/Dashboard';
import RelatoriosDashboard from '../pages/DashboardRelatorios';
import GerenciarAgendamento from '../pages/GerenciarAgendamento';
import GerenciarAgendarDia from '../pages/GerenciarAgendarDia';
import GerenciarFuncionario from '../pages/GerenciarFuncionario';
import GerenciarHospital from '../pages/GerenciarHospital';
import GerenciarMotorista from '../pages/GerenciarMotorista';
import GerenciarPaciente from '../pages/GerenciarPaciente';
import GerenciarVeiculo from '../pages/GerenciarVeiculo';
import Login from '../pages/Login';
import RelatoriosAgendamento from '../pages/RelatoriosAgendamento';
import RelatoriosFornecedores from '../pages/RelatoriosFornecedores';
import RelatoriosManutencao from '../pages/RelatoriosManutencao';
import RelatoriosVeiculos from '../pages/RelatoriosVeiculos';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes: React.FC = () => {
  // Gerenciamento do tema
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
    document.body.classList.toggle("dark-mode", !darkMode); // Alterna a classe no body
  };

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
          <Route path="/gerenciar-agendamentos" element={<><PageTitle /><GerenciarAgendamento /></>} />
          <Route path="/gerenciar-calendario" element={<><PageTitle /><GerenciarAgendarDia /></>} />
          <Route path="/criar-ficha" element={<><PageTitle /><CriarFicha /></>} />
          <Route path="/relatorios-veiculos" element={<><PageTitle /><RelatoriosVeiculos /></>} />
          <Route path="/relatorios-fornecedores" element={<><PageTitle /><RelatoriosFornecedores /></>} />
          <Route path="/relatorios-manutencao" element={<><PageTitle /><RelatoriosManutencao /></>} />
          <Route path="/relatorios-agendamentos" element={<><PageTitle /><RelatoriosAgendamento /></>} />
          <Route path="/dashboard-relatorios" element={<><PageTitle /><RelatoriosDashboard /></>} />
        </Route>

        {/* Rota de fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer  /> {/* Passa o estado darkMode para o Footer */}
    </Router>
  );
};

export default AppRoutes;
