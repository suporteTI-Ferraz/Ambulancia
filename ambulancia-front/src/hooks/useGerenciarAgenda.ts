
import { useEffect, useState } from "react";
import { Agenda } from "../types/agenda/Agenda";
import { createAgenda, fetchAgenda } from "../services/api/AgendamentoService";
import { useToast } from "./useToast";
import { useLoading } from "../contexts/LoadingContext";

const useGerenciarAgenda = () => {
  // Initialize selectedDate with today's date instead of null.
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const { handleError, handleSuccess } = useToast();
  const { loading, setLoading } = useLoading();
    
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
  
  // Create a new agenda on the backend, using the always valid selectedDate.
  const handleCreateAgenda = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const newAgenda: Agenda = {
        id: 0, 
        dataAgenda: formattedDate, 
        diaFinalizado: false
      };
      const response = await createAgenda(newAgenda);
      setAgendas((prev) => [...prev, response.data]);
      handleSuccess("Agenda criada com sucesso!");
      return response.data;
    } catch (error) {
      console.error("Erro ao criar agenda:", error);
      handleError("Erro ao criar agenda: " + error);
      return null;
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
