// GerenciarAgendamento.tsx
import React from "react";
import { useParams } from "react-router-dom";
import AgendamentoForm from "../components/agenda/AgendamentoForm";
import AgendamentoList from "../components/agenda/AgendamentoList";
import useGerenciarPaciente from "../hooks/useGerenciarPaciente";
import { useGerenciarMotorista } from "../hooks/useGerenciarMotorista";
import useGerenciarHospital from "../hooks/useGerenciarHospital";
import useGerenciarVeiculo from "../hooks/useGerenciarVeiculo";
import useGerenciarAgendamento from "../hooks/useGerenciarAgendamento";

const GerenciarAgendamento: React.FC = () => {
  const { agendaId } = useParams<{ agendaId: string }>();
  const { agendamentos, handleCreateAgendamento } = useGerenciarAgendamento();
  const { pacientes } = useGerenciarPaciente();
  const { motoristas } = useGerenciarMotorista();
  const { hospitais} = useGerenciarHospital();
  const { veiculos } = useGerenciarVeiculo();
  
  return (
    <div>
    {agendaId ? (
      // Se o parâmetro existe, renderiza o formulário para criar ou gerenciar o agendamento.
      <div >
        <AgendamentoForm
          pacientes={pacientes}
          motoristas={motoristas}
          hospitais={hospitais}
          veiculos={veiculos}
          onSave={handleCreateAgendamento}
        />
        <AgendamentoList agendamentos={agendamentos} />
      </div>
    ) : (
      <div>Deu ruim</div>
    )}
  </div>
);

};

export default GerenciarAgendamento;
