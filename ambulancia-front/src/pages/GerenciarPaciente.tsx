import React, { useState, useEffect } from "react";
import PacienteList from "../components/paciente/PacienteList";
import TelefoneModal from "../components/modal/TelefoneModal";
import { Paciente } from "../types/paciente/PacienteType";
import { TelefonePac } from "../types/paciente/TelefonePacType";
import { createManyTelPac, createPaciente, fetchPacientes, updatePaciente } from "../services/PacienteService";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PacienteForm from "../components/paciente/PacienteForm";

const GerenciarPaciente = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTelefoneModalOpen, setIsTelefoneModalOpen] = useState(false);
  const [selectedTelefones, setSelectedTelefones] = useState<Paciente["telefones"]>([]);

  useEffect(() => {
    const loadPacientes = async () => {
      const response = await fetchPacientes();
      setPacientes(response.data);
    };
    loadPacientes();
  }, []);

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
  const toggleTelefoneModal = () => setIsTelefoneModalOpen(!isTelefoneModalOpen);

  const handlePacienteSaved = () => {
    const reloadPacientes = async () => {
      const response = await fetchPacientes();
      setPacientes(response.data);
    };
    reloadPacientes();

    if (editingPaciente) {
      toggleEditModal();
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
  

  const handleCreatePaciente = async (newPaciente: Paciente) => {
    try {
      // Cria o paciente e obtém o ID gerado
      const response = await createPaciente(newPaciente);
      const pacienteId = response.data.id;
  
      // Verifica se há telefones para associar ao paciente criado
      if (newPaciente.telefones.length > 0) {
        await createManyTelPac(pacienteId, newPaciente.telefones);
      }
  
      // Atualiza a lista de pacientes após a criação
      handlePacienteSaved();
    } catch (error) {
      console.error("Erro ao criar paciente ou associar telefones:", error);
    }
  };

  const handleSaveTelefones = async (updatedTelefones: TelefonePac[]) => {
    try {
      if (editingPaciente) {
        // Paciente existente
        await createManyTelPac(editingPaciente.id, updatedTelefones);
        handlePacienteSaved();
      } else {
        console.error("Tentativa de salvar telefones sem um paciente selecionado.");
      }
    } catch (error) {
      console.error("Erro ao salvar telefones:", error);
    }
  };
  


  
  
  

  const handleEditPaciente = async (updatedPaciente: Paciente) => {
    await updatePaciente(updatedPaciente.id, updatedPaciente);
    handlePacienteSaved();
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
    onViewTelefones={handleViewTelefones}
    setPacientes={setPacientes}
  />

  {/* Modal para edição */}
  <Modal isOpen={isEditModalOpen} toggle={toggleEditModal} className="gerenciar-paciente">
    <ModalHeader toggle={toggleEditModal}>Editar Paciente</ModalHeader>
    <ModalBody>
      {editingPaciente && (
        <PacienteForm
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

</div>
  );
};

export default GerenciarPaciente;
