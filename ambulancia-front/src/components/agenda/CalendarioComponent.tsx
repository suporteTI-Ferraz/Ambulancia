import { Calendar, dateFnsLocalizer  } from "react-big-calendar";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import {ptBR} from "date-fns/locale/pt-BR";
import { Agendamento } from "../../types/agenda/Agendamento";

interface CalendarioComponentProps {
    agendamentos: Agendamento[];
}


const CalendarioComponent: React.FC<CalendarioComponentProps> = ({ agendamentos }) => {
    const locales = {
        "pt-BR": ptBR,
      };
      
      const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      });
      
      // Objeto de mensagens traduzido para português
      const messages = {
        allDay: "Dia inteiro",
        previous: "Anterior",
        next: "Próximo",
        today: "Hoje",
        month: "Mês",
        week: "Semana",
        day: "Dia",
        agenda: "Agenda",
        date: "Data",
        time: "Hora",
        event: "Evento",
        noEventsInRange: "Não há eventos nesse período.",
        showMore: (total: number) => `+ Ver mais (${total})`
      };

        // Converter os agendamentos para o formato do calendário
        const eventos = agendamentos.map((agendamento) => {
          const dataAgenda = new Date(agendamento.agenda.dataAgenda);
          const [horaInic, minInic] = agendamento.horarioInic.split(":").map(Number);
          const [horaFim, minFim] = agendamento.horarioFim.split(":").map(Number);
        
          return {
            title: `Serviço: ${agendamento.servico} - 
            Hospital: ${agendamento.hospital.enderecos.map(h => `${h.ruaHosp} ${h.numeroHosp}`).join(", ")}`,

            start: new Date(dataAgenda.setHours(horaInic, minInic)),
            end: new Date(dataAgenda.setHours(horaFim, minFim)),
            desc: `
            🧑 Pacientes: ${agendamento.pacientes.map(p => p.nomePaciente).join(", ")}  
            🚗 Motorista: ${agendamento.motorista.nomeMotorista}  
            🔖 Placa: ${agendamento.veiculo.placaVeic}  
            🏥 Hospital: ${agendamento.hospital.enderecos.map(h => `${h.ruaHosp} ${h.numeroHosp}`).join(", ")}`
          };
        });
        
      

  return (
    <div>
      {/* Calendário */}
      <div style={{ width: "80%", height: "600px", margin: "auto" }}>
        <h2>Agendamentos</h2>
        <Calendar
  culture="pt-BR"
  localizer={localizer}
  messages={messages}
  events={eventos}
  startAccessor="start"
  endAccessor="end"
  style={{ height: "100%" }}
  components={{
    event: ({ event }) => (
      <div style={{ padding: '10px', borderRadius: '5px'}}>
        <strong>{event.title}</strong>
        <p>{event.desc}</p>
      </div>
    ),
  }}
/>

      </div>
    </div>
  );
};


export default CalendarioComponent;