import PacienteList from "../components/paciente/PacienteList";
import TelefoneModal from "../components/modal/paciente/TelefoneModal";
import EnderecoPacModal from "../components/modal/paciente/EnderecoPacModal";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import VeiculoForm from "../components/veiculo/VeiculoForm";
import EditPacienteForm from "../components/paciente/EditPacienteForm";
import useGerenciarPaciente from "../hooks/useGerenciarPaciente";
import useGerenciarVeiculo from "../hooks/useGerenciarVeiculo";

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
 

  {/* Modal para edição */}


  {/* Modal para exibição de telefones */}

  {/* Modal para exibição de endereços */}


</div>
  );
};

export default GerenciarVeiculo;
