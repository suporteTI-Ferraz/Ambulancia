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
  const {
    agendamentos,
    editingAgendamento,
    isEditModalOpen,
    handleCreateAgendamento,
    handleEdit,
    toggleEditModal,
    handleUpdateAgendamento,
  } = useGerenciarAgendamento();

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

        <div className="div-botao-agendamento">
          <Link to="/gerenciar-calendario">
            <button type="button">Ir para Calendário</button>
          </Link>
        </div>

        <div className="agendamento-list-container">
          <AgendamentoList agendamentos={agendamentos} onEdit={handleEdit} />
        </div>

        <Modal
          isOpen={isEditModalOpen}
          toggle={toggleEditModal}
          className="modal-editar-agendamento"
          contentClassName="modal-editar-agendamento-content"
        >
          <ModalHeader toggle={toggleEditModal} className="modal-editar-agendamento-header">
            Editar Agendamento
          </ModalHeader>
          <ModalBody className="modal-editar-agendamento-body">
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
      </div>
    </div>
  );
};

export default GerenciarAgendamento;
