import React from "react";
import { FaUser, FaHeartbeat, FaUserNurse, FaAmbulance  } from "react-icons/fa"; // Ícones para funcionários, motoristas, pacientes
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate()

  const handleUserRoute= () =>{
    navigate("/gerenciar-funcionarios")
  }

  return (
    <div className="dashboard-container">
{/* <h1 className="dashboard-title">Bem-vindo ao Sistema de Ambulância</h1> */}
  <div className="dashboard">
      <div className="cards-container">
        <div className="card">
          <FaUser size={60} color="black" />
          <h3>Funcionários</h3>
          <button onClick={handleUserRoute}>Gerenciar</button>
        </div>
        <div className="card">
          <FaUserNurse size={60} />
          <h3>Motoristas</h3>
          <button onClick={() => alert("Gerenciar Motoristas")}>Gerenciar</button>
        </div>
        <div className="card">
          <FaAmbulance size={60} />
          <h3>Ambulâncias</h3>
          <button onClick={() => alert("Gerenciar Ambulâncias")}>Gerenciar</button>
        </div>
        <div className="card">
          <FaHeartbeat size={60} />
          <h3>Pacientes</h3>
          <button onClick={() => alert("Gerenciar Pacientes")}>Gerenciar</button>
        </div>

      </div>
      </div>
      </div>
  );
};

export default Dashboard;
