import { useEffect, useState } from "react";
import { Agenda } from "../types/agenda/Agenda";
import { createAgenda, fetchAgenda } from "../services/api/AgendamentoService";
import { useToast } from "./useToast";
import { useLoading } from "../contexts/LoadingContext";
const useGerenciarAgenda = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const { handleError, handleSuccess } = useToast();
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
    
  // Buscar agendas no backend
  useEffect(() => {
    const fetchAgendas = async () => {
      setLoading(true);
      try {
        const response = await fetchAgenda();
        setAgendas(response.data);
        
      } catch (error) {
        console.error("Erro ao buscar agendas:", error);
        handleError("Erro ao carregar agendas: " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgendas();
  }, []); 

  // Criar uma nova agenda no backend
  const handleCreateAgenda = async () => {
    try {
      if (!selectedDate) return;
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const newAgenda: Agenda = {
        id: 0, 
        dataAgenda: formattedDate, 
        diaFinalizado: false
      };
      const response = await createAgenda(newAgenda);

      // Atualizar a lista para refletir no DatePicker
      setAgendas((prev) => [...prev, response.data]);
      handleSuccess("Agenda criada com sucesso!");
      console.log(agendas)

    } catch (error) {
      console.error("Erro ao criar agenda:", error);
      handleError("Erro ao criar agenda: " + error);
    }
  };

  return {
    agendas,
    selectedDate,
    setSelectedDate,
    handleCreateAgenda,
    loading
  };
};

export default useGerenciarAgenda;
