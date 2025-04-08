import React from "react";
import { Calendar, dateFnsLocalizer  } from "react-big-calendar";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Agendamento } from "../../types/agenda/Agendamento";
import { useNavigate } from "react-router-dom";

interface CalendarioComponentProps {
    agendamentos: Agendamento[];
}

const CalendarioComponent: React.FC<CalendarioComponentProps> = ({ agendamentos }) => {
    const navigate = useNavigate();

    const locales = {
        "pt-BR": ptBR
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

    // Converter os agendamentos para o formato do calendário, adicionando o id para navegação.
    const eventos = agendamentos.map((agendamento) => {
        const dataAgenda = new Date(`${agendamento.agenda.dataAgenda}T00:00:00`);
        const [horaInic, minInic] = agendamento.horarioInic.split(":").map(Number);
        const [horaFim, minFim] = agendamento.horarioFim.split(":").map(Number);
        
        return {
            id: agendamento.agenda.id, // Inclui o ID para navegação
            title: `Serviço: ${agendamento.servico} - Hospital: ${agendamento.hospital.enderecos.map(h => `${h.ruaHosp} ${h.numeroHosp}`).join(", ")}`,
            start: new Date(dataAgenda.setHours(horaInic, minInic)),
            end: new Date(dataAgenda.setHours(horaFim, minFim)),
            desc: `
            🧑 Pacientes: ${agendamento.pacientes.map(p => p.nomePaciente).join(", ")}  
            🚗 Motorista: ${agendamento.motorista.nomeMotorista}  
            🔖 Placa: ${agendamento.veiculo.placaVeic}  
            🏥 Hospital: ${agendamento.hospital.enderecos.map(h => `${h.ruaHosp} ${h.numeroHosp}`).join(", ")}
            `
        };
    });
        
    // Handler for when an event is clicked: navigates to the manage page for that agenda.
    const handleSelectEvent = (event: any) => {
        if (event.id) {
            navigate(`/gerenciar-agendamentos/${event.id}`);
        }
    };

    return (
        <div className="big-calendar-container">
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
                    onSelectEvent={handleSelectEvent}
                    components={{
                        event: ({ event }) => (
                            <div style={{ padding: '10px', borderRadius: '5px' }}>
                                <strong>{event.title}</strong>
                                <p>{event.desc}</p>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    );
};

export default CalendarioComponent;
