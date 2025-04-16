import useGerenciarAgendamento from "../hooks/useGerenciarAgendamento";
import CalendarioComponent from "../components/agenda/CalendarioComponent";
import { Link } from "react-router-dom";
import "../styles/GerenciarAgendamentos.css";

const GerenciarAgendarDia = () => {
  const { agendamentos } = useGerenciarAgendamento();

  return (
    <div className="container-calendario-agendamentos">
      <CalendarioComponent agendamentos={agendamentos} />

      <div className="botao-wrapper">
        <Link to="/gerenciar-agendamentos" className="botao-navegacao">
          <button type="button">Ir para Gerenciar Agendamentos</button>
        </Link>
      </div>
    </div>
  );
};

export default GerenciarAgendarDia;
