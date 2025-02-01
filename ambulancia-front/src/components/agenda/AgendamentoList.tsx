import { Agendamento } from "../../types/agenda/Agendamento";
import DataCriacao from "../itens/DataFormatada";

interface AgendamentoListProps {
  agendamentos: Agendamento[];
}

const AgendamentoList: React.FC<AgendamentoListProps> = ({ agendamentos }) => {


    return (
        <div>
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
              </tr>
            </thead>
            <tbody>
    {agendamentos.map((agendamento) => (
      <tr key={agendamento.id}>
        <td><DataCriacao createdAt={agendamento.createdAt} /></td>
        <td>{agendamento.agenda.dataAgenda}</td>
        <td>{agendamento.horarioInic}</td>
        <td>{agendamento.pacientes.map((paciente) => paciente.nomePaciente).join(", ")}</td>
        <td>{agendamento.motorista.nomeMotorista}</td>
        <td>{agendamento.veiculo.placaVeic}</td>
        <td>{agendamento.hospital.enderecos.map((endereco) => endereco.ruaHosp).join(", ")}</td>
      </tr>
    ))}
  </tbody>
          </table>
        </div>
      );
    };




export default AgendamentoList