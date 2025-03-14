import { FaUser, FaHeartbeat, FaUserNurse, FaAmbulance, FaHospital, FaCalendarAlt  } from "react-icons/fa"; // Ícones para funcionários, motoristas, pacientes
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate()

  const handleUserRoute = () =>{
    navigate("/gerenciar-funcionarios")
  }

  const handlePacienteRoute = () =>{
    navigate("/gerenciar-pacientes")
  }

  const handleMotoristaRoute = () =>{
    navigate("/gerenciar-motoristas")
  }

  const handleHospitalRoute = () =>{
    navigate("/gerenciar-hospitais")
  }
  const handleVeiculoRoute = () =>{
    navigate("/gerenciar-ambulancias")
  }

  const handleAgendarDiaRoute = () =>{
    navigate("/gerenciar-agendamentos/")

  }

  return (
    <div className="dashboard-container">
{/* <h1 className="dashboard-title">Bem-vindo ao Sistema de Ambulância</h1> */}
  <div className="dashboard" >
      <div className="cards-container" >
        <div className="card" style={{display:'flex', justifyContent:'center'}}>
          <FaUser size={40} color="black" style={{marginLeft: '40%'}}/>
          <h3>Funcionários</h3>
          <button onClick={handleUserRoute}>Gerenciar</button>
        </div>
        <div className="card">
          <FaUserNurse size={60} />
          <h3>Motoristas</h3>
          <button onClick={handleMotoristaRoute}>Gerenciar</button>
        </div>
        <div className="card">
          <FaHeartbeat size={60} />
          <h3>Pacientes</h3>
          <button onClick={handlePacienteRoute}>Gerenciar</button>
        </div>

        <div className="card">
          <FaHospital size={60} />
          <h3>Hospitais</h3>
          <button onClick={handleHospitalRoute}>Gerenciar</button>
        </div>
        <div className="card">
          <FaAmbulance size={60} />
          <h3>Ambulâncias</h3>
          <button onClick={handleVeiculoRoute}>Gerenciar</button>
        </div>

        <div className="card">
          <FaCalendarAlt size={60} />
          <h3>Agendamentos</h3>
          <button onClick={handleAgendarDiaRoute}>Gerenciar</button>
        </div>
 

      </div>
      </div>
      </div>
  );
};

export default Dashboard;
