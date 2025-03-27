import React, { useState } from 'react';
import { Motorista } from '../../types/motorista/MotoristaType';
import { FiEdit, FiRefreshCw, FiSearch, FiTrash } from 'react-icons/fi';
import DataCriacao from '../itens/DataFormatada';
import '../../styles/MotoristaList.css';

interface MotoristaListProps {
  motoristas: Motorista[];
  onEdit: (motorista: Motorista) => void;
  onDelete: (id: number, deletedAt: string | null) => void;
}

const MotoristaList: React.FC<MotoristaListProps> = ({ motoristas, onEdit, onDelete }) => {
  const [pesquisarMotorista, setPesquisarMotorista] = useState('');

  const filteredMotoristas = motoristas.filter(motorista =>
    motorista.nomeMotorista.toLowerCase().includes(pesquisarMotorista.toLowerCase())
  );

  const sortedMotoristas = filteredMotoristas.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="form-section2-motorista">
      {/* Campo de Pesquisa */}
      <div className="custom-search-container-motorista">
        <FiSearch className="custom-search-icon-user-list-motorista" />
        <input
          type="text"
          placeholder="Pesquisar por Nome ou CPF"
          value={pesquisarMotorista}
          onChange={(e) => setPesquisarMotorista(e.target.value)}
          className="custom-input-search-motorista"
        />
      </div>

      <table className="custom-table-motorista">
        <thead>
          <tr>
            <th className="custom-th-motorista">Criação</th>
            <th className="custom-th-motorista">Nome</th>
            <th className="custom-th-motorista">Status</th>
            <th className="custom-th-motorista">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedMotoristas.map((motorista) => (
            <tr
              key={motorista.id}
              style={{ backgroundColor: motorista.deletedAt ? '#ffcccc' : 'white' }} // Cor vermelha se motorista estiver desativado
              className="custom-tr-motorista"
            >
              <td className="custom-td-motorista"><DataCriacao createdAt={motorista.createdAt} /></td>
              <td className="custom-td-motorista">{motorista.nomeMotorista}</td>
              <td className="custom-td-motorista">{motorista.deletedAt ? 'Desativado' : 'Ativo'}</td>
              <td className="custom-td-motorista">
                {/* Ícones de Ações */}
                <FiEdit
                  className="custom-icon-action-motorista edit"
                  title="Editar"
                  onClick={() => onEdit(motorista)}
                />
                {motorista.deletedAt ? (
                  <FiRefreshCw
                    className="custom-icon-action-motorista reactivate"
                    title="Reativar"
                    onClick={() => onDelete(motorista.id, motorista.deletedAt)}
                  />
                ) : (
                  <FiTrash
                    className="custom-icon-action-motorista delete"
                    title="Desativar"
                    onClick={() => onDelete(motorista.id, null)}
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

export default MotoristaList;
