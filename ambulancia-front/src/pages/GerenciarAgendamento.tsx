import React from "react";
import AgendamentoForm from "../components/agenda/AgendamentoForm";
import AgendamentoList from "../components/agenda/AgendamentoList";
import useGerenciarPaciente from "../hooks/useGerenciarPaciente";
import { useGerenciarMotorista } from "../hooks/useGerenciarMotorista";
import useGerenciarHospital from "../hooks/useGerenciarHospital";
import useGerenciarVeiculo from "../hooks/useGerenciarVeiculo";
import useGerenciarAgendamento from "../hooks/useGerenciarAgendamento";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import EditAgendamentoForm from "../components/agenda/EditAgendamentoForm";
import { Link } from "react-router-dom";

const GerenciarAgendamento: React.FC = () => {
  const { agendamentos, editingAgendamento, isEditModalOpen, 
          handleCreateAgendamento, handleEdit, toggleEditModal, handleUpdateAgendamento } = useGerenciarAgendamento();
  const { pacientes } = useGerenciarPaciente();
  const { motoristas } = useGerenciarMotorista();
  const { hospitais } = useGerenciarHospital();
  const { veiculos } = useGerenciarVeiculo();
  
  return (
    <div className="agendamento-form">
      <div> 
        <AgendamentoForm
          pacientes={pacientes}
          motoristas={motoristas}
          hospitais={hospitais}
          veiculos={veiculos}
          onSave={handleCreateAgendamento}
        />
        <AgendamentoList agendamentos={agendamentos} onEdit={handleEdit} />

        <Modal isOpen={isEditModalOpen} toggle={toggleEditModal} className="gerenciar edit-agendamento-form">
          <ModalHeader toggle={toggleEditModal}>Editar Agendamento</ModalHeader>
          <ModalBody>
            {editingAgendamento && (
              <EditAgendamentoForm
                agendamento={editingAgendamento}
                pacientes={pacientes}
                motoristas={motoristas}
                hospitais={hospitais}
                veiculos={veiculos}
                onSave={handleUpdateAgendamento}
              />
            )}
          </ModalBody>
        </Modal>

        {/* Navigation Button to GerenciarAgendarDia */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/gerenciar-calendario">
            <button type="button">Ir para Calendario</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GerenciarAgendamento;