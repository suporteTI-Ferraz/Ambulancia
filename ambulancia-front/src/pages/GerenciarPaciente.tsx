import React, { useState, useEffect } from "react";
import PacienteList from "../components/paciente/PacienteList";
import TelefoneModal from "../components/modal/TelefoneModal";
import { Paciente } from "../types/paciente/PacienteType";
import { fetchPacientes } from "../services/PacienteService";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

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

  const handleViewTelefones = (telefones: Paciente["telefones"]) => {
    setSelectedTelefones(telefones);
    toggleTelefoneModal();
  };

  return (
    <div className="gerenciar-paciente">
      <h3>Gerenciar Pacientes</h3>

      {/* Formulário para criação de paciente */}
      <div>
      </div>

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
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleEditModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal para exibição de telefones */}
      <TelefoneModal
        telefones={selectedTelefones}
        isOpen={isTelefoneModalOpen}
        toggle={toggleTelefoneModal}
      />
    </div>
  );
};

export default GerenciarPaciente;
