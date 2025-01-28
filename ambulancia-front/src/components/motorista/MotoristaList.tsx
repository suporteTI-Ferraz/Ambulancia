import React, { useState } from 'react';
import { Motorista } from '../../types/motorista/MotoristaType';
import { FiEdit, FiRefreshCw, FiSearch, FiTrash } from 'react-icons/fi';
import DataCriacao from '../itens/DataFormatada';

interface MotoristaListProps {
    motoristas: Motorista[];
    onEdit: (motorista: Motorista) => void;
    onDelete: (id: number, deletedAt: string | null) => void;
}

const MotoristaList: React.FC<MotoristaListProps> = ( {motoristas, onEdit, onDelete} ) => {

    const [pesquisarMotorista, setPesquisarMotorista] = useState('');
    
    const filteredMotoristas = motoristas.filter(motorista =>
        motorista.nomeMotorista.toLowerCase().includes(pesquisarMotorista.toLowerCase())
      );

    const sortedMotoristas = filteredMotoristas.sort((a, b) => {
      
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      return(
         <div>
                {/* Campo de Pesquisa */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <FiSearch style={{ marginRight: "8px", fontSize: "20px", color: "#007BFF" }} />
                  <input
                    type="text"
                    placeholder="Pesquisar por Nome ou CPF"
                    value={pesquisarMotorista}
                    onChange={(e) => setPesquisarMotorista(e.target.value)}
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

                <table>
        <thead>
          <tr>
            <th>Criação</th>
            <th>Nome</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedMotoristas.map((motorista) => (
            <tr
              key={motorista.id}
              style={{ backgroundColor: motorista.deletedAt ? '#ffcccc' : 'white' }}
            >
              <td><DataCriacao createdAt={motorista.createdAt} /></td>
              <td>{motorista.nomeMotorista}</td>
              <td>{motorista.deletedAt ? 'Desativado' : 'Ativo'}</td>
              <td>
                {/* Ícones de Ações */}
                <FiEdit
                  className="icon-action edit"
                  title="Editar"
                  onClick={() => onEdit(motorista)}
                />
                {motorista.deletedAt ? (
                  <FiRefreshCw
                    className="icon-action reactivate"
                    title="Reativar"
                    onClick={() => onDelete(motorista.id, motorista.deletedAt)}
                  />
                ) : (
                  <FiTrash
                    className="icon-action delete"
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

