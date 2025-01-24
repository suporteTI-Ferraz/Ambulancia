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
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isTelefoneModalOpen, setIsTelefoneModalOpen] = useState(false);
  const [selectedTelefones, setSelectedTelefones] = useState<Paciente["telefones"]>([]);

  const [isEnderecoModalOpen, setIsEnderecoModalOpen] = useState(false);
  const [selectedEnderecos, setSelectedEnderecos] = useState<Paciente["enderecos"]>([]);

  useEffect(() => {
    const loadPacientes = async () => {
      const response = await fetchPacientes();
      setPacientes(response.data);
    };
    loadPacientes();
  }, []);

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

  
  const handleEditPaciente = async (updatedPaciente: Paciente) => {
    try {
      await updatePaciente(updatedPaciente.id, updatedPaciente);
      await updateManyTelPac(updatedPaciente.id, updatedPaciente.telefones);
      await updateManyEndPac(updatedPaciente.id, updatedPaciente.enderecos);
      handlePacienteSaved();
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
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
  enderecos={selectedEnderecos}
  isOpen={isEnderecoModalOpen}
  toggle={toggleEnderecoModal}
  onEnderecosChange={handleSaveEnderecosFromModal}
  />


</div>
  );
};

export default GerenciarPaciente;
