import { useEffect, useState } from "react";
import { Agendamento, CreateAgendamentoDTO } from "../types/agenda/Agendamento";
import { fetchAgendamento, createAgendamento } from "../services/api/AgendamentoService";
import { createAgenda, fetchAgenda } from "../services/api/AgendamentoService";
import { useToast } from "./useToast";
import { useLoading } from "../contexts/LoadingContext";

  

const useGerenciarAgendamento = () => {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]); // Lista de Hospital
    const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
    const { handleError, handleSuccess } = useToast();



  useEffect(() => {
        const loadAgendamentos = async () => {
          setLoading(true);
          try {
            const response = await fetchAgendamento();
            setAgendamentos(response.data);
          } catch (error) {
            handleError("Erro ao carregar Agendamentos.");
          } finally {
            setLoading(false);
          }
        };
        loadAgendamentos();
      }, []); //Carrega só uma vez na construção do componente 
    

    

        const handleCreateAgendamento = async (dto: CreateAgendamentoDTO): Promise<Agendamento | null> => {
          setLoading(true);
          try {
            // Constrói o objeto que será enviado para o backend.
            // Assumindo que o backend espera um objeto com as relações aninhadas.
          
      
            const response = await createAgendamento(dto);
            handleSuccess("Agendamento criado com sucesso!");
            return response.data;
          } catch (error) {
            handleError("Erro ao criar agendamento: " + error);
            return null;
          } finally {
            setLoading(false);
          }
        };
      
        return { agendamentos, handleCreateAgendamento };
      };
export default useGerenciarAgendamento;
