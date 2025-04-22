import React, { useState } from "react";
import { FiEdit, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import '../../styles/UserList.css';
import { Veiculo } from "../../types/veiculo/VeiculoType";
import DataCriacao from "../itens/DataFormatada";

interface VeiculoListProps {
  veiculos: Veiculo[];
  onEdit: (veiculo: Veiculo) => void;
  onDelete: (id: number, deletedAt: string | null) => void;
  onViewManutencoes: (veiculo: Veiculo) => void;
}

const VeiculoList: React.FC<VeiculoListProps> = ({ veiculos, onEdit, onViewManutencoes, onDelete }) => {
  const [pesquisarVeiculo, setPesquisarVeiculo] = useState('');

  const filteredVeiculos = veiculos.filter(veiculo =>
    veiculo.placaVeic.toLowerCase().includes(pesquisarVeiculo.toLowerCase())
  );

  // Ordenar os veículos pela data de criação ou pelo id (ordem decrescente)
  const sortedVeiculos = filteredVeiculos.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="form-section2-funcionario">
      {/* Campo de Pesquisa */}
      <div className="custom-search-container">
        <FiSearch className="custom-search-icon-user-list" />
        <input
          className="custom-input-search"
          type="text"
          placeholder="Pesquisar por Placa de Veículo"
          value={pesquisarVeiculo}
          onChange={(e) => setPesquisarVeiculo(e.target.value)}
        />
      </div>

      {/* Tabela de Veículos */}
      <table className="custom-table">
        <thead>
          <tr className="custom-th-tr">
            <th className="custom-th">Criação</th>
            <th className="custom-th">Placa</th>
            <th className="custom-th">Modelo</th>
            <th className="custom-th">Quilometragem Atual</th>
            <th className="custom-th">Status</th>
            <th className="custom-th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedVeiculos.map((veiculo) => (
            <tr
              key={veiculo.id}
              className={`custom-tr ${veiculo.deletedAt ? 'row-deleted' : 'row-active'}`}
            >
              <td className="custom-td"><DataCriacao createdAt={veiculo.createdAt} /></td>
              <td className="custom-td">{veiculo.placaVeic}</td>
              <td className="custom-td">{veiculo.modeloVeic}</td>
              <td className="custom-td">{veiculo.quilometragemAtual}</td>
              <td className="custom-td">
                <span className={veiculo.deletedAt ? 'status-desativado' : 'status-ativo'}>
                  {veiculo.deletedAt ? 'Desativado' : 'Ativo'}
                </span>
              </td>
              <td className="custom-td">
                <div className="icon-container">
                  <FiEdit
                    className="custom-icon-action edit"
                    title="Editar"
                    onClick={() => onEdit(veiculo)}
                  />
                  {veiculo.deletedAt ? (
                    <FiRefreshCw
                      className="custom-icon-action reactivate"
                      title="Reativar"
                      onClick={() => onDelete(veiculo.id, veiculo.deletedAt)}
                    />
                  ) : (
                    <FiTrash
                      className="custom-icon-action delete"
                      title="Desativar"
                      onClick={() => onDelete(veiculo.id, null)}
                    />
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

export default VeiculoList;
