import useGerenciarAgenda from "../hooks/useGerenciarAgenda";
import AgendaComponent from "../components/agenda/AgendarDiaComponent";
import useGerenciarAgendamento from "../hooks/useGerenciarAgendamento";
import CalendarioComponent from "../components/agenda/CalendarioComponent";

const GerenciarAgendarDia = () => {
  const { agendas, selectedDate, setSelectedDate, handleCreateAgenda } = useGerenciarAgenda();
  const {agendamentos} = useGerenciarAgendamento();
  
  return (
    <div >
      <AgendaComponent
        agendas={agendas}
        selectedDate={selectedDate}
        onSelected={setSelectedDate}
        onSave={handleCreateAgenda}
      />
      <CalendarioComponent agendamentos={agendamentos}/>

    </div>
  );
};

export default GerenciarAgendarDia;
