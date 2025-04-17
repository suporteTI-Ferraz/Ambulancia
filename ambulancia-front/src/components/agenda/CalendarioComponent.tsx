// CalendarioComponent.tsx

import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Deixe esse se quiser os estilos base do calendário
import "moment/locale/pt-br";
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

    const eventos = agendamentos.map((agendamento) => {
        const dataAgenda = new Date(`${agendamento.data}T00:00:00`);
        const [horaInic, minInic] = agendamento.horarioInic.split(":").map(Number);
        const [horaFim, minFim] = agendamento.horarioFim.split(":").map(Number);

        return {
            id: agendamento.id,
            title: `Ocorrência`,
            start: new Date(dataAgenda.setHours(horaInic, minInic)),
            end: new Date(dataAgenda.setHours(horaFim, minFim)),
            // desc: `
            // 🧑 Pacientes: ${agendamento.pacientes.map(p => p.nomePaciente).join(", ")}  
            // 🚗 Motorista: ${agendamento.motorista.nomeMotorista}  
            // 🔖 Placa: ${agendamento.veiculo.placaVeic}  
            // 🏥 Hospital: ${agendamento.hospital.enderecos.map(h => `${h.ruaHosp} ${h.numeroHosp}`).join(", ")}
            // `
        };
    });

    const handleSelectEvent = (event: any) => {
        if (event.id) {
            navigate(`/gerenciar-agendamentos/${event.id}`);
        }
    };

    return (
        <div className="calendario-wrapper">
            <div className="calendario-content">
                <h2 className="calendario-titulo">Agendamentos</h2>
                <Calendar
                    className="calendario-componente"
                    culture="pt-BR"
                    localizer={localizer}
                    messages={messages}
                    events={eventos}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleSelectEvent}
                    components={{
                        event: ({ event }) => (
                            <div className="calendario-evento">
                                <strong className="calendario-evento-titulo">{event.title}</strong>
                                {/* <p className="calendario-evento-desc">{event.desc}</p> */}
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    );
};

export default CalendarioComponent;
