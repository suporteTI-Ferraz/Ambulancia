import { Modal, ModalHeader, ModalBody } from "reactstrap";
import VeiculoForm from "../components/veiculo/VeiculoForm";
import EditPacienteForm from "../components/paciente/EditPacienteForm";
import useGerenciarPaciente from "../hooks/useGerenciarPaciente";
import useGerenciarVeiculo from "../hooks/useGerenciarVeiculo";
import VeiculoList from "../components/veiculo/VeiculoList";
import EditVeiculoForm from "../components/veiculo/EditVeiculoForm";
import ManutencaoModal from "../components/modal/motorista/ManutencaoModal";
const GerenciarVeiculo = () => {



  const {
    veiculos, loading, isEditModalOpen, isManutencaoModalOpen,
    selectedManutencoes, editingVeiculo,
    handleSaveVeiculo,
    handleDeleteVeiculo,
    handleEditVeiculo,
    toggleEditModal,
    setEditingVeiculo,
    toggleModalManutencao,
    handleEdit,    
    handleViewManutencoes,
    handleSaveManutencoesFromModal,
  } = useGerenciarVeiculo();

  return (
    <div className="gerenciar">
  <h3>Gerenciar Veículos</h3>

  {/* Formulário para criação de paciente fora do modal */}
  <h4>Criar Veículo</h4>
  <VeiculoForm
    onSave={handleSaveVeiculo}
    onCancel={() => setEditingVeiculo(null)}
  />

  {/* Lista de pacientes */}
    <VeiculoList
    veiculos={veiculos}
    onEdit={handleEdit}
    onDelete={handleDeleteVeiculo}
    onViewManutencoes={handleViewManutencoes}
    />
 

  {/* Modal para edição */}
  <Modal isOpen={isEditModalOpen} toggle={toggleEditModal} className="gerenciar">
    <ModalHeader toggle={toggleEditModal}>Editar Veículo</ModalHeader>
    <ModalBody>
      {editingVeiculo && (
        <EditVeiculoForm
        veiculo={editingVeiculo}
        onSave={handleEditVeiculo}
        onCancel={toggleEditModal}
        />
      )}
    </ModalBody>
  </Modal>


  {/* Modal para exibição de multas */}

  {/* Modal para exibição de manutenções */}
  <ManutencaoModal
  manutencoes={selectedManutencoes} isOpen={isManutencaoModalOpen} 
  toggle={toggleModalManutencao} onManutencoesChange={handleSaveManutencoesFromModal}
  />


</div>
  );
};

export default GerenciarVeiculo;
