import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Agenda } from "../../types/agenda/Agenda";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";

// Registra o idioma português no DatePicker
registerLocale("pt-BR", ptBR);

interface AgendaFormProps {
  agendas: Agenda[];
  selectedDate: Date | null;
  onSave: () => void;
  onSelected: (date: Date | null) => void;
}

const AgendarDiaComponent: React.FC<AgendaFormProps> = ({ agendas, selectedDate, onSave, onSelected }) => {
  const parseDate = (dateString: string) => new Date(dateString + "T00:00:00");
  const navigate = useNavigate();

  // Verifica se a data já existe na agenda
  const agendaExistente = selectedDate
    ? agendas.find((a) => parseDate(a.dataAgenda).toDateString() === selectedDate.toDateString())
    : null;

  // Quando o usuário seleciona uma data já existente
  const handleSelectAgenda = () => {
    if (agendaExistente) {
      navigate(`/gerenciar-agendamentos/${agendaExistente.id}`);
    }
  };

  return (
    <div>
      <h2>Selecione uma Data</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => onSelected(date)}
        highlightDates={agendas.map((a) => parseDate(a.dataAgenda))}
        locale="pt-BR"  // 🔥 Define o idioma para português
        dateFormat="dd/MM/yyyy"  // 🔥 Formato da data
        inline
      />

      {selectedDate && (
        <div>
          {agendaExistente ? (
            <button onClick={handleSelectAgenda}>Ver Agendamentos</button>
          ) : (
            <button onClick={onSave}>Criar Agenda</button>
          )}
        </div>
      )}
    </div>
  );
};

export default AgendarDiaComponent;
