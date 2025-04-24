
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RelatoriosDashboard.css';

const RelatoriosDashboard: React.FC = () => {
  return (

    <div className="dashboard-container-relatorios">
      <h1>Dashboard de Relatórios</h1>
      <p>Acesse os relatórios a seguir:</p>
        <div className='dashboard-relatorios'>
          <div className="reports-grid">
            <Link to="/relatorios-veiculos" className="report-card">
              <h2>Relatório de Veículos</h2>
              <p>Visualize o relatório com informações dos veículos.</p>
            </Link>
            <Link to="/relatorios-manutencao" className="report-card">
              <h2>Relatório de Manutenção</h2>
              <p>Confira as manutenções realizadas nos veículos.</p>
            </Link>
            <Link to="/relatorios-fornecedores" className="report-card">
              <h2>Relatório de Fornecedores</h2>
              <p>Visualize informações sobre os fornecedores.</p>
            </Link>
            <Link to="/relatorios-agendamentos" className="report-card">
              <h2>Relatório de Agendamento</h2>
              <p>Acesse os agendamentos e seus detalhes.</p>
            </Link>
          </div>
        </div>
    </div>
  );
};

export default RelatoriosDashboard;
