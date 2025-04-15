import React, { useState } from "react";
import { FiEdit, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import '../../styles/PacienteList.css';
import { Paciente } from "../../types/paciente/PacienteType";
import DataCriacao from "../itens/DataFormatada";

interface PacienteListProps {
  pacientes: Paciente[];
  onEdit: (paciente: Paciente) => void;
  onDelete: (id: number, deletedAt: string | null) => void;
  onViewTelefones: (paciente: Paciente) => void;
  onViewEnderecos: (paciente: Paciente) => void;
}

const PacienteList: React.FC<PacienteListProps> = ({ pacientes, onEdit, onViewTelefones, onViewEnderecos, onDelete }) => {
  const [pesquisarPaciente, setPesquisarPaciente] = useState('');

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nomePaciente.toLowerCase().includes(pesquisarPaciente.toLowerCase()) ||
    paciente.cpf.toLowerCase().includes(pesquisarPaciente.toLowerCase())
  );

  const sortedPacientes = filteredPacientes.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="form-section2">
      {/* Campo de Pesquisa */}
      <div className="custom-search-container">
        <FiSearch className="custom-search-icon-user-list" />
        <input
          className="custom-input-search"
          type="text"
          placeholder="Pesquisar por Nome ou CPF"
          value={pesquisarPaciente}
          onChange={(e) => setPesquisarPaciente(e.target.value)}
        />
      </div>

      {/* Tabela de Pacientes */}
      <table className="custom-table">
        <thead>
          <tr>
            <th className="custom-th">Criação</th>
            <th className="custom-th">Nome</th>
            <th className="custom-th">Data de Nascimento</th>
            <th className="custom-th">CPF</th>
            <th className="custom-th">SUS</th>
            <th className="custom-th">Ruas</th>
            <th className="custom-th">Telefones</th>
            <th className="custom-th">Status</th>
            <th className="custom-th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedPacientes.map((paciente) => (
            <tr
              key={paciente.id}
              style={{ backgroundColor: paciente.deletedAt ? '#ffcccc' : 'white' }} // Cor vermelha se paciente estiver desativado
              className="custom-tr"
            >
              <td className="custom-td-paciente"><DataCriacao createdAt={paciente.createdAt} /></td>
              <td className="custom-td-paciente">{paciente.nomePaciente}</td>
              <td className="custom-td-paciente"><DataCriacao createdAt={paciente.dataNasc} showTime={false} /></td>
              <td className="custom-td-paciente">{paciente.cpf}</td>
              <td className="custom-td-paciente">{paciente.sus}</td>
              <td className="custom-td-paciente">
                {paciente.enderecos.map((endereco) => (
                  <div key={endereco.id}>{endereco.ruaPac}</div>
                ))}
              </td>
              <td className="custom-td-paciente">
                {paciente.telefones.map((telefone) => (
                  <div key={telefone.id}>
                    {telefone.tipoTel}: {telefone.numTel}
                  </div>
                ))}
              </td>
              <td className="custom-td-paciente">{paciente.deletedAt ? 'Desativado' : 'Ativo' }! O Paciente se encontra falecido ? {paciente.falecido ? 'Sim' : 'Não'}</td>
              <td className="custom-td-paciente">
                <div className="icon-container">
                  <FiEdit
                    className="custom-icon-action edit"
                    title="Editar"
                    onClick={() => onEdit(paciente)} />
                  {paciente.deletedAt ? (
                    <FiRefreshCw
                      className="custom-icon-action reactivate"
                      title="Reativar"
                      onClick={() => onDelete(paciente.id, paciente.deletedAt)} />
                  ) : (
                    <FiTrash
                      className="custom-icon-action delete"
                      title="Desativar"
                      onClick={() => onDelete(paciente.id, null)} />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacienteList;
