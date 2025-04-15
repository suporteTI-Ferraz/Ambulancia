import useGerenciarAgendamento from "../hooks/useGerenciarAgendamento";
import CalendarioComponent from "../components/agenda/CalendarioComponent";
import { Link } from "react-router-dom";

const GerenciarAgendarDia = () => {
  const { agendamentos } = useGerenciarAgendamento();

  return (
    <div >

      <CalendarioComponent agendamentos={agendamentos} />
      {/* Navigation Button to GerenciarAgendamento */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link to="/gerenciar-agendamentos">
          <button type="button">Ir para Gerenciar Agendamentos</button>
        </Link>
      </div>
    </div>
  );
};

export default GerenciarAgendarDia;
