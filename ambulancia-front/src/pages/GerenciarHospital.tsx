import { Modal, ModalHeader, ModalBody } from "reactstrap";
import useGerenciarHospital from "../hooks/useGerenciarHospital";
import HospitalForm from "../components/hospital/HospitalForm";
import HospitalList from "../components/hospital/HospitalList";
import EdithospitalForm from "../components/hospital/EditHospitalForm";
import EnderecoHospModal from "../components/modal/hospital/EnderecoHospModal";

const GerenciarHospital = () => {



  const {
    hospitais, loading, isEditModalOpen, isEnderecoModalOpen, selectedEnderecos, editingHospital,
    handleCreateHospital, handleDeleteHospital, handleEditHospital, toggleEditModal,
    toggleEnderecoModal, handleEdit, handleViewEnderecos, handleSaveEnderecosFromModal,
    setEditingHospital,
  } = useGerenciarHospital();

  return (
    <div className="gerenciar">
  <h3>Gerenciar Hospitais</h3>

  {/* Formulário para criação de paciente fora do modal */}
  <h4>Criar Hospital</h4>
  <HospitalForm
    onSave={handleCreateHospital}
    onCancel={() => setEditingHospital(null)}
  />

  {/* Lista de pacientes */}
  <HospitalList
    hospitais={hospitais}
    onEdit={handleEdit}
    onDelete={handleDeleteHospital}
    onViewEnderecos={handleViewEnderecos}
  />

  {/* Modal para edição */}
  <Modal isOpen={isEditModalOpen} toggle={toggleEditModal} className="gerenciar">
    <ModalHeader toggle={toggleEditModal}>Editar Hospitais</ModalHeader>
    <ModalBody>
      {editingHospital && (
        <EdithospitalForm
          hospital={editingHospital}
          onSave={handleEditHospital}
          onCancel={toggleEditModal}
        />
      )}
    </ModalBody>
  </Modal>

  {/* Modal para exibição de endereços */}
  <EnderecoHospModal
  enderecos={selectedEnderecos} // Array de enderecos do paciente selecionado
  isOpen={isEnderecoModalOpen} //Variável que diz se modal está aberto ou fechado
  toggle={toggleEnderecoModal} //Método que a
  onEnderecosChange={handleSaveEnderecosFromModal}
  />

</div>
  );
};

export default GerenciarHospital;
