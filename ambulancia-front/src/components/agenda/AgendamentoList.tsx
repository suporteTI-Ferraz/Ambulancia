import { FiEdit } from "react-icons/fi";
import { Agendamento } from "../../types/agenda/Agendamento";
import DataCriacao from "../itens/DataFormatada";
import { useParams } from "react-router-dom";

interface AgendamentoListProps {
  agendamentos: Agendamento[];
  onEdit: (agendamento: Agendamento) => void;
  
}

const AgendamentoList: React.FC<AgendamentoListProps> = ({ agendamentos, onEdit }) => {
  const { agendaId } = useParams<{ agendaId: string }>();
  const agendamentosFiltrados = agendamentos.filter((agendamento) => agendamento.agenda.id === Number(agendaId));



  return (
    <div className="agendamento-list">
      {/* Campo de Pesquisa */}

      {/* Tabela de hospitais */}
      <table>
        <thead>
          <tr>
            <th>Criação</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Pacientes</th>
            <th>Motorista</th>
            <th>Veículo</th>
            <th>Hospital</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentosFiltrados.map((agendamento) => (
            <tr key={agendamento.id}>
              <td><DataCriacao createdAt={agendamento.createdAt} /></td>
              <td>{agendamento.agenda.dataAgenda}</td>
              <td>{agendamento.horarioInic}</td>
              <td>
                {agendamento.pacientes.map((paciente) => (
                  <div 
                    key={paciente.id} 
                    style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      borderBottom: "1px solid #ddd",
                      padding: "5px 0" 
                    }}
                  >
                    <span>{paciente.nomePaciente}</span>
                    <button
                      onClick={() => alert("Exclusão de paciente")}
                      style={{
                        cursor: "pointer",
                        background: "transparent",
                        border: "none",
                        color: "red",
                        fontSize: "14px",
                        padding: "0 5px"
                      }}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </td>

              <td>{agendamento.motorista.nomeMotorista}</td>
              <td>{agendamento.veiculo.placaVeic}</td>
              <td>{agendamento.hospital.enderecos.map((endereco) => endereco.ruaHosp).join(", ")}</td>
              {/* Ícones de Ações */}
                {/* Ícones de Ações */}
                           <FiEdit
                             className="icon-action edit"
                             title="Editar"
                             onClick={() => onEdit(agendamento)}
                           />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};





export default AgendamentoList