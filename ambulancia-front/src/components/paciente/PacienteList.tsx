import React, { useState } from "react";
import { Paciente } from "../../types/paciente/PacienteType";
import { FiEdit, FiPhone, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import { FaMapLocationDot } from "react-icons/fa6";
import { deletePaciente, reactivatePaciente } from "../../services/PacienteService";


interface PacienteListProps {
  pacientes: Paciente[];
  onEdit: (paciente: Paciente) => void;
  onViewTelefones: (paciente: Paciente) => void;
  onViewEnderecos: (paciente: Paciente) => void;
  setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
}


const PacienteList: React.FC<PacienteListProps> = ({ pacientes, onEdit, onViewTelefones, onViewEnderecos, setPacientes }) => {
    const [pesquisarPaciente, setPesquisarPaciente] = useState('');

    const filteredPacientes = pacientes.filter(paciente =>
      paciente.nomePaciente.toLowerCase().includes(pesquisarPaciente.toLowerCase()) ||
      paciente.cpf.toLowerCase().includes(pesquisarPaciente.toLowerCase())
    );

      const toggleDelete = async (id: number, deletedAt: string | null) => {
        try {
          let response;
          if (deletedAt) {
            // Reativar usuário
            response = await reactivatePaciente(id);
          } else {
            // Deletar usuário
            response = await deletePaciente(id);
          }
    
          if (response.status === 200) {
            setPacientes(prevPacientes =>
              prevPacientes.map(paciente =>
                paciente.id === id
                  ? {
                      ...paciente,
                      deletedAt: deletedAt ? null : new Date().toISOString(),
                    }
                  : paciente
              )
            );
          }
        } catch (error) {
          console.error('Erro ao alternar status do usuário', error);
        }
      };
    
  
    return (
      <div>
        {/* Campo de Pesquisa */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <FiSearch style={{ marginRight: "8px", fontSize: "20px", color: "#007BFF" }} />
          <input
            type="text"
            placeholder="Pesquisar por Nome ou CPF"
            value={pesquisarPaciente}
            onChange={(e) => setPesquisarPaciente(e.target.value)}
            style={{
              padding: "8px",
              fontSize: "14px",
              border: "2px solid #007BFF",
              borderRadius: "4px",
              width: "100%",
              maxWidth: "400px",
            }}
          />
        </div>
  
        {/* Tabela de Pacientes */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>SUS</th>
              <th>Ruas</th>
              <th>Telefones</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPacientes.map((paciente) => (
              <tr key={paciente.id} style={{ backgroundColor: paciente.deletedAt ? '#ffcccc' : 'white' }}>
                <td>{paciente.id}</td>
                <td>{paciente.nomePaciente}</td>
                <td>{paciente.cpf}</td>
                <td>{paciente.sus}</td>
                <td>
                  {paciente.enderecos.map((endereco) => (
                    <div key={endereco.id}>{endereco.ruaPac}</div>
                  ))}
                </td>
                <td>
                  {paciente.telefones.map((telefone) => (
                    <div key={telefone.id}>
                      {telefone.tipoTel}: {telefone.numTel}
                    </div>
                  ))}
                </td>
                <td>{paciente.deletedAt ? 'Desativado' : 'Ativo'}</td>
                <td>
                  <FiEdit 
                  className="icon-action edit" 
                  title="Editar" 
                  onClick={() => onEdit(paciente)} />
                  <FaMapLocationDot
                  className="icon-action endereco" 
                    title="Visualizar Endereços"
                    onClick={() => onViewEnderecos(paciente)}
                  />
                  <FiPhone
                    className="icon-action telefone"
                    title="Visualizar Telefones"
                    onClick={() => onViewTelefones(paciente)}
                  />
                  {paciente.deletedAt ? (
                    <FiRefreshCw
                      className="icon-action reactivate"
                      title="Reativar"
                      onClick={() => toggleDelete(paciente.id, paciente.deletedAt)}
                    />
                  ) : (
                    <FiTrash
                      className="icon-action delete"
                      title="Desativar"
                      onClick={() => toggleDelete(paciente.id, null)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PacienteList;