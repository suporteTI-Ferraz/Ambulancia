import { useState, useEffect } from "react";
import {fetchPacientes, createPaciente, updatePaciente, deletePaciente, reactivatePaciente, 
createManyTelPac, createManyEndPac, updateManyTelPac, updateManyEndPac,} from "../services/api/PacienteService";
import { Paciente } from "../types/paciente/PacienteType";
import { TelefonePac } from "../types/paciente/TelefonePacType";
import { EnderecoPac } from "../types/paciente/EnderecoPacType";
import { useToast } from "./useToast";

export const useGerenciarPaciente = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]); // Lista de pacientes
  const [loading, setLoading] = useState(false);

  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //Modal para editar o paciente

  const [isTelefoneModalOpen, setIsTelefoneModalOpen] = useState(false); //Modal para adicionar telefones novos
  const [selectedTelefones, setSelectedTelefones] = useState<Paciente["telefones"]>([]);

  const [isEnderecoModalOpen, setIsEnderecoModalOpen] = useState(false); //Modal para adicionar endereços novos
  const [selectedEnderecos, setSelectedEnderecos] = useState<Paciente["enderecos"]>([]);


  const { handleError, handleSuccess } = useToast();

  useEffect(() => {
    const loadPacientes = async () => {
      setLoading(true);
      try {
        const response = await fetchPacientes();
        setPacientes(response.data);
      } catch (error) {
        handleError("Erro ao carregar pacientes.");
      } finally {
        setLoading(false);
      }
    };
    loadPacientes();
  }, []); //Carrega só uma vez na construção do componente 

  

  //Métodos para fechar modais
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen); 
  const toggleTelefoneModal = () => setIsTelefoneModalOpen(!isTelefoneModalOpen);
  const toggleEnderecoModal = () => setIsEnderecoModalOpen(!isEnderecoModalOpen);

  const reloadPacientes = async () => {
    try {
      const response = await fetchPacientes();
      setPacientes(response.data);
    } catch (error) {
      console.error("Erro ao recarregar pacientes:", error);
    }finally{
      setEditingPaciente(null);
    }
  };

  const handleCreatePaciente = async (newPaciente: Paciente) => {
    setLoading(true);
    try {
      const copiaNewPaciente = { ...newPaciente, enderecos: [], telefones: [] };
      const response = await createPaciente(copiaNewPaciente);
      const createdPaciente = response.data;
      
      if (newPaciente.telefones.length > 0) {
        const telefones = await createManyTelPac(createdPaciente.id, newPaciente.telefones);
        createdPaciente.telefones = telefones.data;
      }
      if (newPaciente.enderecos.length > 0) {
        const enderecos = await createManyEndPac(createdPaciente.id, newPaciente.enderecos);
        createdPaciente.enderecos = enderecos.data;

      }
       // Atualiza o paciente com os dados criados e ID
       const pacienteAtualizado = { 
        ...createdPaciente, 
        createdAt: response.data.createdAt 
      };
      
      // Atualiza o estado de pacientes
      setPacientes((prevPacientes) => [...prevPacientes, pacienteAtualizado]);
      handleSuccess("Paciente criado com sucesso!");
    } catch (error) {
      handleError("Erro ao criar paciente "+ error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPaciente = async (
    updatedPaciente: Paciente,
    notUpdatedPaciente: Paciente  ) => {
    setLoading(true);
    try {
      const isPacienteChanged =
        updatedPaciente.nomePaciente !== notUpdatedPaciente.nomePaciente ||
        updatedPaciente.cpf !== notUpdatedPaciente.cpf ||
        updatedPaciente.sus !== notUpdatedPaciente.sus ||
        updatedPaciente.condicoesEspecificas !==
          notUpdatedPaciente.condicoesEspecificas;

      // Verifica se os telefones no formulário foram alterados 
      const isTelefonesChanged = JSON.stringify(updatedPaciente.telefones) !== JSON.stringify(notUpdatedPaciente.telefones);
      // Verifica se os endereços no formulário foram alterados 
      const isEnderecosChanged = JSON.stringify(updatedPaciente.enderecos) !== JSON.stringify(notUpdatedPaciente.enderecos);

      // Se houver alterações no paciente, atualizar paciente
      if (isPacienteChanged) {
        console.log("Paciente Atualizado!!!!");
        await updatePaciente(updatedPaciente.id, updatedPaciente);
      }

      if (isTelefonesChanged) {
        console.log("Telefones Atualizados!!!!")
        await updateManyTelPac(updatedPaciente.id, updatedPaciente.telefones);
      }
      if (isEnderecosChanged) {
        console.log("Endereços Atualizados!!!!");
        await updateManyEndPac(updatedPaciente.id, updatedPaciente.enderecos);
      }
      //Atualiza a lista de pacientes localmente (substitui o paciente antigo pelo atualizado)
      const updatedPacientes = pacientes.map(paciente =>
        paciente.id === notUpdatedPaciente.id ? updatedPaciente : paciente
      );
      setPacientes(updatedPacientes);
      handleSuccess("Paciente atualizado com sucesso!");

    } catch (error) {
      handleError("Falha ao Atualizar Paciente: "+ error)
    } finally {
      setLoading(false);
      toggleEditModal(); //Fecha o modal de editar usuários
    }
  };

  const handleDeletePaciente = async (id: number, deletedAt: string | null) => {
    try {
      setLoading(true);
      let response;
      if (deletedAt) {
        // Reativar usuário
        response = await reactivatePaciente(id);
        handleSuccess("Paciente reativado com sucesso!");
      } else {
        // Deletar usuário
        response = await deletePaciente(id);
        handleSuccess("Paciente desativado com sucesso!");
      }

      if (response.status === 200) {
        setPacientes(prevPacientes =>
          prevPacientes.map(paciente =>
            paciente.id === id
              ? {
                  ...paciente,
                  deletedAt: deletedAt ? null : new Date().toISOString(),
                }
              : paciente
          )
        );
        //await reloadPacientes();
      }
    } catch (error) {
      console.error('Erro ao alternar status do usuário', error);
    }finally{
      setLoading(false);
    }
  };


  const handleEdit = (paciente: Paciente) => {
    console.log("Paciente selecionado para edição:", paciente); // Debug
    setEditingPaciente(paciente);
    toggleEditModal();
  };

  const handleViewTelefones = (paciente: Paciente) => {
    if (!paciente) {
      alert("Selecione um paciente antes de gerenciar os telefones.");
      return;
    }
    setEditingPaciente(paciente);
    setSelectedTelefones(paciente.telefones || []);
    toggleTelefoneModal();
  };


  const handleSaveTelefonesFromModal = async (telefones: TelefonePac[]) => {
    if (!editingPaciente) {
      alert("Nenhum paciente está sendo editado para associar os telefones.");
      return;
    }
    
    try {
      const response = await createManyTelPac(editingPaciente.id, telefones); // Salva os telefones no backend
      const createdTelefones = response.data;
      setPacientes(prevPacientes =>
        prevPacientes.map(paciente =>
          paciente.id === editingPaciente.id
            ? {
                ...paciente,
                telefones: [...paciente.telefones, ...createdTelefones] // Adiciona os novos telefones à lista existente
              }
            : paciente
        )
      );
      handleSuccess("Telefones criados com sucesso!");
      
      
    } catch (error) {
      handleError("Falha ao criar Telefones: "+ error)
    } finally {
      toggleTelefoneModal(); // Fecha o modal
    }
  };

  const handleViewEnderecos = (paciente: Paciente) => {
    if (!paciente) {
      alert("Selecione um paciente antes de gerenciar os endereços.");
      return;
    }
    setEditingPaciente(paciente);
    setSelectedEnderecos(paciente.enderecos || []);
    toggleEnderecoModal();
  }

  const handleSaveEnderecosFromModal = async (enderecos: EnderecoPac[]) => {
    if (!editingPaciente) {
      alert("Nenhum paciente está sendo editado para associar os telefones.");
      return;
    }
  
    try {
      const response = await createManyEndPac(editingPaciente.id, enderecos); // Salva os endereços no backend
      const createdEnderecos = response.data;
      setPacientes(prevPacientes =>
        prevPacientes.map(paciente => 
          paciente.id === editingPaciente.id 
          ? {
            ...paciente,
            enderecos: [...paciente.enderecos, ...createdEnderecos]
            
          }
          : paciente
        )
      );
    } catch (error) {
      console.error("Erro ao salvar os endereços:", error);
    } finally {
      toggleEnderecoModal(); // Fecha o modal
    }
  };

  return { pacientes, loading, editingPaciente, isEditModalOpen, isEnderecoModalOpen,
    isTelefoneModalOpen, selectedEnderecos, selectedTelefones, 
    setEditingPaciente, handleCreatePaciente, handleEditPaciente, handleDeletePaciente,
    handleSaveEnderecosFromModal, handleSaveTelefonesFromModal,
    setPacientes, reloadPacientes, toggleEditModal, toggleEnderecoModal, toggleTelefoneModal,
    handleViewEnderecos, handleViewTelefones, handleEdit,
  };
};

export default useGerenciarPaciente;
