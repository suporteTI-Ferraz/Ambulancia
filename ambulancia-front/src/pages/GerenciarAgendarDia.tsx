import useGerenciarAgendamento from "../hooks/useGerenciarAgendamento";
import CalendarioComponent from "../components/agenda/CalendarioComponent";

const GerenciarAgendarDia = () => {
  const {agendamentos} = useGerenciarAgendamento();
  
  return (
    <div >
      
      <CalendarioComponent agendamentos={agendamentos}/>

    </div>
  );
};

export default GerenciarAgendarDia;
