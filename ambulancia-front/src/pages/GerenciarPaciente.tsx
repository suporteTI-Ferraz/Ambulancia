import PacienteList from "../components/paciente/PacienteList";
import TelefoneModal from "../components/modal/paciente/TelefoneModal";
import EnderecoPacModal from "../components/modal/paciente/EnderecoPacModal";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PacienteForm from "../components/paciente/PacienteForm";
import EditPacienteForm from "../components/paciente/EditPacienteForm";
import useGerenciarPaciente from "../hooks/useGerenciarPaciente";
import '../styles/GerenciarPaciente.css'

const GerenciarPaciente = () => {



  const {
    pacientes, loading, isEditModalOpen, isEnderecoModalOpen, isTelefoneModalOpen,
    selectedEnderecos, selectedTelefones, editingPaciente,
    handleCreatePaciente,
    handleDeletePaciente,
    handleEditPaciente,
    toggleEditModal,
    toggleEnderecoModal,
    toggleTelefoneModal,
    handleEdit,    
    handleViewTelefones,
    handleViewEnderecos,
    handleSaveEnderecosFromModal,
    handleSaveTelefonesFromModal,
    setEditingPaciente,
  } = useGerenciarPaciente();

  return (
    <div className="gerenciar">

      {/* Formulário para criação de paciente fora do modal */}
      <h4 className="titulo-form-paciente">Criar Paciente</h4>
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
