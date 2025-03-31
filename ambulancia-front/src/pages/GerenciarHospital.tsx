import { Modal, ModalHeader, ModalBody } from "reactstrap";
import useGerenciarHospital from "../hooks/useGerenciarHospital";
import HospitalForm from "../components/hospital/HospitalForm";
import HospitalList from "../components/hospital/HospitalList";
import EdithospitalForm from "../components/hospital/EditHospitalForm";
import EnderecoHospModal from "../components/modal/hospital/EnderecoHospModal";
import '../styles/GerenciarHospital.css'

const GerenciarHospital = () => {

  const {
    hospitais, loading, isEditModalOpen, isEnderecoModalOpen, selectedEnderecos, editingHospital,
    handleCreateHospital, handleDeleteHospital, handleEditHospital, toggleEditModal,
    toggleEnderecoModal, handleEdit, handleViewEnderecos, handleSaveEnderecosFromModal,
    setEditingHospital,
  } = useGerenciarHospital();

  return (
    <div className="gerenciar-hospital-container">
      <h3 className="titulo-gerenciar-hospital">Gerenciar Hospitais</h3>

      {/* Formulário para criação de hospital */}
      <div className="form-section-hospital">
        <div className="container-hospital">
        <h4 className="titulo-form-hospital">Criar Hospital</h4>
        <HospitalForm
          onSave={handleCreateHospital}
          onCancel={() => setEditingHospital(null)}
        />
        </div>
      </div>

      {/* Lista de hospitais */}
      <div className="hospital-list-section">
        <HospitalList
          hospitais={hospitais}
          onEdit={handleEdit}
          onDelete={handleDeleteHospital}
          onViewEnderecos={handleViewEnderecos}
        />
      </div>

      {/* Modal para edição */}
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal} className="modal-gerenciar-hospital">
        <ModalHeader toggle={toggleEditModal} className="modal-header-hospital">Editar Hospital</ModalHeader>
          <div className="teste1234">
            <ModalBody className="modal-body-hospital">
              {editingHospital && (
                <EdithospitalForm
                  hospital={editingHospital}
                  onSave={handleEditHospital}
                  onCancel={toggleEditModal}
                />
              )}
            </ModalBody>
          </div>
      </Modal>

      {/* Modal para exibição de endereços */}
      <EnderecoHospModal
        enderecos={selectedEnderecos}
        isOpen={isEnderecoModalOpen}
        toggle={toggleEnderecoModal}
        onEnderecosChange={handleSaveEnderecosFromModal}
      />
    </div>
  );
};

export default GerenciarHospital;
