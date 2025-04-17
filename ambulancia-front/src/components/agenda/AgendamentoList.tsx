import { FiEdit } from "react-icons/fi";
import { Agendamento } from "../../types/agenda/Agendamento";


interface AgendamentoListProps {
  agendamentos: Agendamento[];
  onEdit: (agendamento: Agendamento) => void;
}

const AgendamentoList: React.FC<AgendamentoListProps> = ({ agendamentos, onEdit }) => {

  return (
    <div className="agendamento-list">
      {/* Campo de Pesquisa */}

      {/* Tabela de hospitais */}
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Serviço</th>
            <th>Horário Inicial</th>
            <th>Horário Final</th>
            <th>KM Inicial</th>
            <th>KM Final</th>
            <th>Pacientes</th>
            <th>Motorista</th>
            <th>Veículo</th>
            <th>Hospital</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento) => (
            <tr key={agendamento.id}>
              <td>{agendamento.data}</td>
              <td>{agendamento.servico}</td>
              <td>{agendamento.horarioInic}</td>
              <td>{agendamento.horarioFim}</td>
              <td>{agendamento.quilometragemInicial}</td>
              <td>{agendamento.quilometragemFinal}</td>
              <td>
                {agendamento.pacientes.map((paciente) => (
                  <div key={paciente.id} className="paciente-item">
                    <span>{paciente.nomePaciente}</span>
                    <button
                      onClick={() => alert("Exclusão de paciente")}
                      className="delete-button"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </td>
              <td>{agendamento.motorista.nomeMotorista}</td>
              <td>{agendamento.veiculo.placaVeic}</td>
              <td>{agendamento.hospital.enderecos.map((endereco) => endereco.ruaHosp).join(", ")}</td>
              <td>
                <FiEdit
                  className="icon-action edit"
                  title="Editar"
                  onClick={() => onEdit(agendamento)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgendamentoList;
