import { useState, useEffect } from "react";
import PacienteList from "../components/paciente/PacienteList";
import TelefoneModal from "../components/modal/paciente/TelefoneModal";
import EnderecoPacModal from "../components/modal/paciente/EnderecoPacModal";
import { Paciente } from "../types/paciente/PacienteType";
import { TelefonePac } from "../types/paciente/TelefonePacType";
import { createManyTelPac, createManyEndPac, createPaciente, fetchPacientes, updatePaciente, reactivatePaciente, deletePaciente, updateManyTelPac, updateManyEndPac } from "../services/PacienteService";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PacienteForm from "../components/paciente/PacienteForm";
import { EnderecoPac } from "../types/paciente/EnderecoPacType";
import EditPacienteForm from "../components/paciente/EditPacienteForm";

const GerenciarPaciente = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]); //Lista de pacientes
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //Modal para editar o paciente

  const [isTelefoneModalOpen, setIsTelefoneModalOpen] = useState(false); //Modal para adicionar telefones novos
  const [selectedTelefones, setSelectedTelefones] = useState<Paciente["telefones"]>([]);

  const [isEnderecoModalOpen, setIsEnderecoModalOpen] = useState(false); //Modal para adicionar endereços novos
  const [selectedEnderecos, setSelectedEnderecos] = useState<Paciente["enderecos"]>([]);

  useEffect(() => {
    const loadPacientes = async () => {
      const response = await fetchPacientes();
      setPacientes(response.data);
    };
    loadPacientes();
  }, []);

//Métodos para fechar modais
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen); 
  const toggleTelefoneModal = () => setIsTelefoneModalOpen(!isTelefoneModalOpen);
  const toggleEnderecoModal = () => setIsEnderecoModalOpen(!isEnderecoModalOpen);


  const handlePacienteSaved = () => {
    const reloadPacientes = async () => {
      const response = await fetchPacientes();
      setPacientes(response.data);
    };
    reloadPacientes();

    if (editingPaciente) {
      //toggleEditModal();
    }
    setEditingPaciente(null);
  };

  const handleEdit = (paciente: Paciente) => {
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
      await createManyTelPac(editingPaciente.id, telefones); // Salva os telefones no backend
      handlePacienteSaved(); // Recarrega a lista de pacientes
    } catch (error) {
      console.error("Erro ao salvar os telefones:", error);
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
      await createManyEndPac(editingPaciente.id, enderecos); // Salva os telefones no backend
      handlePacienteSaved(); // Recarrega a lista de pacientes
    } catch (error) {
      console.error("Erro ao salvar os endereços:", error);
    } finally {
      toggleEnderecoModal(); // Fecha o modal
    }
  };
  

  const handleCreatePaciente = async (newPaciente: Paciente) => {
    console.log("Novo Paciente:", newPaciente); // Verificar se o paciente possui telefones e endereços preenchidos
    try {
        const copiaNewPaciente = { ...newPaciente, enderecos: [], telefones: [] }; //Pacientes são criados com endereços vazios
        const response = await createPaciente(copiaNewPaciente);
        console.log("Paciente criado com sucesso:", response.data);

        
        const pacienteId = response.data.id;
        if (newPaciente.telefones.length > 0) {
            console.log("Salvando Telefones:", newPaciente.telefones);
            await createManyTelPac(pacienteId, newPaciente.telefones);
        }

        if (newPaciente.enderecos.length > 0) {
            console.log("Salvando Endereços:", newPaciente.enderecos);
            await createManyEndPac(pacienteId, newPaciente.enderecos);
        }

        handlePacienteSaved();
    } catch (error) {
        console.error("Erro ao criar paciente:", error);
    }
};

//ATENÇÃO, AS VERIFICAÇÕES ABAIXO FORAM CRIADAS PARA NÂO CHAMAR REQUISIÇÔES DESNECESSÁRIAS NA ATUALIZAÇÂO DO PACIENTE
  const handleEditPaciente = async (updatedPaciente: Paciente, notUpdatedPaciente: Paciente) => {
    try {
      const isPacienteChanged = updatedPaciente.nomePaciente !== notUpdatedPaciente.nomePaciente ||
      updatedPaciente.cpf !== notUpdatedPaciente.cpf ||
      updatedPaciente.sus !== notUpdatedPaciente.sus ||
      updatedPaciente.condicoesEspecificas !== notUpdatedPaciente.condicoesEspecificas;

    // Verifica se os telefones no formulário foram alterados 
    const isTelefonesChanged = JSON.stringify(updatedPaciente.telefones) !== JSON.stringify(notUpdatedPaciente.telefones);

    // Verifica se os endereços no formulário foram alterados 
    const isEnderecosChanged = JSON.stringify(updatedPaciente.enderecos) !== JSON.stringify(notUpdatedPaciente.enderecos);

    // Se houver alterações no paciente, atualizar paciente
    if (isPacienteChanged) {
      console.log("Paciente Atualizado!!!!");
      await updatePaciente(updatedPaciente.id, updatedPaciente);
    }

    // Se houver alterações nos telefones, atualizar telefones
    if (isTelefonesChanged) {
      console.log("Telefones Atualizados!!!!")
      await updateManyTelPac(updatedPaciente.id, updatedPaciente.telefones);
    }

    // Se houver alterações nos endereços, atualizar endereços
    if (isEnderecosChanged) {
      console.log("Endereços Atualizados!!!!");
      await updateManyEndPac(updatedPaciente.id, updatedPaciente.enderecos);
    }

    // Após a atualização, chama a função para indicar que o paciente foi salvo
    handlePacienteSaved();

  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
  }finally{
    toggleEditModal(); // Fecha o modal

  }
};

   const handleDeletePaciente = async (id: number, deletedAt: string | null) => {
          try {
            let response;
            if (deletedAt) {
              // Reativar usuário
              response = await reactivatePaciente(id);
            } else {
              // Deletar usuário
              response = await deletePaciente(id);
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
              handlePacienteSaved()
            }
          } catch (error) {
            console.error('Erro ao alternar status do usuário', error);
          }
        };

  return (
    <div className="gerenciar">
  <h3>Gerenciar Pacientes</h3>

  {/* Formulário para criação de paciente fora do modal */}
  <h4>Criar Paciente</h4>
  <PacienteForm
    onSave={handleCreatePaciente}
    onCancel={() => setEditingPaciente(null)}
  />

  {/* Lista de pacientes */}
  <PacienteList
    pacientes={pacientes}
    onEdit={handleEdit}
    onDelete={handleDeletePaciente}
    onViewTelefones={handleViewTelefones}
    onViewEnderecos={handleViewEnderecos}
    setPacientes={setPacientes}
  />

  {/* Modal para edição */}
  <Modal isOpen={isEditModalOpen} toggle={toggleEditModal} className="gerenciar">
    <ModalHeader toggle={toggleEditModal}>Editar Paciente</ModalHeader>
    <ModalBody>
      {editingPaciente && (
        <EditPacienteForm
          paciente={editingPaciente}
          onSave={handleEditPaciente}
          onCancel={toggleEditModal}
        />
      )}
    </ModalBody>
  </Modal>

  {/* Modal para exibição de telefones */}
  <TelefoneModal
  telefones={selectedTelefones} // Este é um array de `TelefonePac`
  isOpen={isTelefoneModalOpen}
  toggle={toggleTelefoneModal}
  onTelefonesChange={handleSaveTelefonesFromModal}
/>
  {/* Modal para exibição de endereços */}
  <EnderecoPacModal
  enderecos={selectedEnderecos} // Array de enderecos do paciente selecionado
  isOpen={isEnderecoModalOpen} //Variável que diz se modal está aberto ou fechado
  toggle={toggleEnderecoModal} //Método que a
  onEnderecosChange={handleSaveEnderecosFromModal}
  />


</div>
  );
};

export default GerenciarPaciente;
