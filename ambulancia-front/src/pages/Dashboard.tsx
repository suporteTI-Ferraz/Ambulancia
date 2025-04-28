import { FaUser, FaHeartbeat, FaUserNurse, FaAmbulance, FaHospital, FaCalendarAlt, FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import React, { useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleUserRoute = () => {
    navigate("/gerenciar-funcionarios");
  };

  const handlePacienteRoute = () => {
    navigate("/gerenciar-pacientes");
  }

  const handleMotoristaRoute = () => {
    navigate("/gerenciar-motoristas");
  }

  const handleHospitalRoute = () => {
    navigate("/gerenciar-hospitais");
  }

  const handleVeiculoRoute = () => {
    navigate("/gerenciar-ambulancias");
  }

  const handleAgendarDiaRoute = () => {
    navigate("/gerenciar-agendamentos/");
  }

  const handleCriarFicha = () => {
    navigate("/criar-ficha/");
  }

  const handleRelatorios = () => {
    navigate("/dashboard-relatorios");
  }


  return (
    <>
      <div className="dashboard-container bg-image-dashboard">
        <div className="dashboard">
          <div className="cards-container">
            <div className="card" onClick={handleUserRoute}>
              <FaUser className="icon" />
              <h3>Usuários</h3>
            </div>

            <div className="card" onClick={handleMotoristaRoute}>
              <FaUserNurse className="icon" />
              <h3>Motoristas</h3>
            </div>

            <div className="card" onClick={handlePacienteRoute}>
              <FaHeartbeat className="icon" />
              <h3>Pacientes</h3>
            </div>

            <div className="card" onClick={handleHospitalRoute}>
              <FaHospital className="icon" />
              <h3>Hospitais</h3>
            </div>

            <div className="card" onClick={handleVeiculoRoute}>
              <FaAmbulance className="icon" />
              <h3>Veículos</h3>
            </div>

            <div className="card" onClick={handleAgendarDiaRoute}>
              <FaCalendarAlt className="icon" />
              <h3>Agendamentos</h3>
            </div>

            <div className="card" onClick={handleCriarFicha}>
              <MdEditDocument className="icon" />
              <h3>Criar ficha</h3>
            </div>

            <div className="card" onClick={handleRelatorios}>
              <VscGraph className="icon" />
              <h3>Relatórios</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
