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
      

      return (
        <div>
                 {/* Calendário */}
                  <div style={{ width: "60%", height: "500px" }}>
                    <h2>Agendamentos</h2>
                    <Calendar
                      culture="pt-BR" // Define o idioma diretamente no calendário
                      localizer={localizer}
                      messages={messages} // Aqui passamos as traduções
                      events={[
                        {
                          title: "Consulta João no hospital",
                          start: new Date(2025, 1, 1, 10, 0),
                          end: new Date(2025, 1, 1, 11, 0),
                        },
                      ]}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: "100%" }}
                    />
                  </div>
        </div>
      )


}

export default CalendarioComponent;