import useGerenciarAgenda from "../hooks/useGerenciarAgenda";
import AgendaComponent from "../components/agenda/AgendarDiaComponent";
import useGerenciarUser from "../hooks/useGerenciarUser";

const GerenciarAgendarDia = () => {
  const { agendas, selectedDate, setSelectedDate, handleCreateAgenda } = useGerenciarAgenda();
  
  return (
    <div>
      <AgendaComponent
        agendas={agendas}
        selectedDate={selectedDate}
        onSelected={setSelectedDate}
        onSave={handleCreateAgenda}
      />
    </div>
  );
};

export default GerenciarAgendarDia;
