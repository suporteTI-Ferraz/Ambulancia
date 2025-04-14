import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { createAgendamento, fetchAgendamento, updateAgendamento } from "../services/api/AgendamentoService";
import { Agendamento, CreateAgendamentoDTO, EditAgendamentoDTO } from "../types/agenda/Agendamento";
import { useToast } from "./useToast";

  

const useGerenciarAgendamento = () => {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]); // Lista de Hospital
      const [editingAgendamento, setEditingAgendamento] = useState<Agendamento | null>(null);
      const [isEditModalOpen, setIsEditModalOpen] = useState(false); //Modal para editar o Hospital

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
    
      const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen); 

      const handleEdit = (agendamento: Agendamento) => {
          console.log("Agendamento selecionado para edição:", agendamento); // Debug
          setEditingAgendamento(agendamento);
          toggleEditModal();
        };
    

        const handleCreateAgendamento = async (dto: CreateAgendamentoDTO) => {
          setLoading(true);
          try {
            // Constrói o objeto que será enviado para o backend.
            // Assumindo que o backend espera um objeto com as relações aninhadas.
      
            const response = await createAgendamento(dto);
            const createdAgendamento = response.data;
            console.log(dto.quilometragemFinal.valueOf());
            console.log(dto)
            setAgendamentos(prevAgendamentos => [...prevAgendamentos, createdAgendamento]);
            handleSuccess("Agendamento criado com sucesso!");
          } catch (error) {
            handleError("Erro ao criar agendamento: " + error);
            return null;
          } finally {
            setLoading(false);
          }
        };

        const handleUpdateAgendamento = async (dto: EditAgendamentoDTO) => {
          setLoading(true);
          try {
            const id = dto.id;
              const response = await updateAgendamento(id, dto);
              const updatedAgendamento = response.data;
              
              // Atualiza a lista de agendamentos no estado
              setAgendamentos(prevAgendamentos =>
                  prevAgendamentos.map(agendamento =>
                      agendamento.id === id ? updatedAgendamento : agendamento
                  )
              );
      
              handleSuccess("Agendamento atualizado com sucesso!");
          } catch (error) {
              handleError("Erro ao atualizar agendamento: " + error);
              return null;
          } finally {
              setLoading(false);
          }
      };
      
      
        return { agendamentos, editingAgendamento, isEditModalOpen, handleCreateAgendamento, handleEdit, toggleEditModal, handleUpdateAgendamento };
      };
export default useGerenciarAgendamento;
