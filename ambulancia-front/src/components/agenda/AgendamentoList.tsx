

import { FiEdit } from "react-icons/fi";
import { Agendamento } from "../../types/agenda/Agendamento";

// Função utilitária pega do CriarFicha para padronizar datas (sem bug do dia anterior)
function formatDateBR(dateString: string): string {
  if (!dateString) return '';
  // Lida explicitamente com datas no formato "YYYY-MM-DD"
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  let date: Date;
  if (isoRegex.test(dateString)) {
    // Trata como data local, não UTC!
    const parts = dateString.split('-').map(Number);
    // Mês começa do zero no JS!
    date = new Date(parts[0], parts[1] - 1, parts[2]);
  } else {
    date = new Date(dateString);
  }
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('pt-BR');
}

interface AgendamentoListProps {
  agendamentos: Agendamento[];
  onEdit: (agendamento: Agendamento) => void;
}

const AgendamentoList: React.FC<AgendamentoListProps> = ({ agendamentos, onEdit }) => {

  return (
    <div className="agendamento-list">
      {/* Campo de Pesquisa */}

      {/* Tabela de hospitais */}
      <table className="report-table">
        <thead>
          <tr>
            <th className="report-table-th">Data</th>
            <th className="report-table-th">Serviço</th>
            <th className="report-table-th">Horário Inicial</th>
            <th className="report-table-th">Horário Final</th>
            <th className="report-table-th">KM Inicial</th>
            <th className="report-table-th">KM Final</th>
            <th className="report-table-th">Pacientes</th>
            <th className="report-table-th">Motorista</th>
            <th className="report-table-th">Veículo</th>
            <th className="report-table-th">Hospital</th>
            <th className="report-table-th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento) => (
            <tr key={agendamento.id}>
              <td className="report-table-td">{formatDateBR(agendamento.data)}</td>
              <td className="report-table-td">{agendamento.servico}</td>
              <td className="report-table-td">{agendamento.horarioInic}</td>
              <td className="report-table-td">{agendamento.horarioFim}</td>
              <td className="report-table-td">{agendamento.quilometragemInicial}</td>
              <td className="report-table-td">{agendamento.quilometragemFinal}</td>
              <td className="report-table-td">
                {agendamento.pacientes.map((paciente) => (
                  <div key={paciente.id} className="paciente-item">
                    <span>{paciente.nomePaciente}</span>
                  </div>
                ))}
              </td>
              <td className="report-table-td">{agendamento.motorista.nomeMotorista}</td>
              <td className="report-table-td">{agendamento.veiculo.placaVeic}</td>
              <td className="report-table-td">{agendamento.hospital.enderecos.map((endereco) => endereco.ruaHosp).join(", ")}</td>
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

