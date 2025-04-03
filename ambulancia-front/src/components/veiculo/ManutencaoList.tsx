import React, { useState } from "react";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import { FiEdit, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import { GiAutoRepair, GiMechanicGarage } from "react-icons/gi";
import DataCriacao from "../itens/DataFormatada";
import { Fornecedor } from "../../types/veiculo/FornecedorType";
import Manutencao from "../../types/veiculo/ManutencaoType";

interface FornecedorListProps {
  manutencoes: Manutencao[];
  onEdit: (manutencao: Manutencao) => void;
  onDelete: (id: number, deletedAt: string | null) => void;
}

const ManutencaoList: React.FC<FornecedorListProps> = ({ manutencoes, onEdit, onDelete }) => {
  const [pesquisarManutencao, setPesquisarManutencao] = useState('');

  const filteredManutencoes = manutencoes.filter(manutencao =>
    manutencao.dataEntradaManutencao.toLowerCase().includes(pesquisarManutencao.toLowerCase())
  );

  // Ordenar os itens pela data de criação ou pelo id (ordem decrescente)
  const sortedManutencoes = filteredManutencoes.sort((a, b) => {
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
          placeholder="Pesquisar por Data da Manutenção"
          value={pesquisarManutencao}
          onChange={(e) => setPesquisarManutencao(e.target.value)}
        />
      </div>

      {/* Tabela de Manutenções */}
      <table className="custom-table">
        <thead>
          <tr className="custom-th-tr">
            <th className="custom-th">Criação</th>
            <th className="custom-th">Tipo</th>
            <th className="custom-th">Data de Entrada da Manutenção</th>
            <th className="custom-th">Data de Saída da Manutenção</th>
            <th className="custom-th">Custo</th>
            <th className="custom-th">Situação</th>
            <th className="custom-th">Descrição</th>
            <th className="custom-th">Serviço</th>
            <th className="custom-th">Status</th>
            <th className="custom-th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedManutencoes.map((manutencao) => (
            <tr
              key={manutencao.id}
              className="custom-tr"
              style={{ backgroundColor: manutencao.deletedAt ? '#ffcccc' : 'white' }}
            >
              <td className="custom-td"><DataCriacao createdAt={manutencao.createdAt} /></td>
              <td className="custom-td">{manutencao.tipoManutencao}</td>
              <td className="custom-td"><DataCriacao createdAt={manutencao.dataEntradaManutencao} /></td>
              <td className="custom-td"><DataCriacao createdAt={manutencao.dataSaidaManutencao} /></td>
              <td className="custom-td">{manutencao.custoManutencao}</td>
              <td className="custom-td">{manutencao.status}</td>
              <td className="custom-td">{manutencao.descricaoProblema}</td>
              <td className="custom-td">{manutencao.servicoRealizado}</td>
              <td className="custom-td">{manutencao.deletedAt ? 'Desativado' : 'Ativo'}</td>
              <td className="custom-td">
                <div className="icon-container">
                  <FiEdit
                    className="custom-icon-action edit"
                    title="Editar"
                    onClick={() => onEdit(manutencao)}
                  />
                  {manutencao.deletedAt ? (
                    <FiRefreshCw
                      className="custom-icon-action reactivate"
                      title="Reativar"
                      onClick={() => onDelete(manutencao.id, manutencao.deletedAt)}
                    />
                  ) : (
                    <FiTrash
                      className="custom-icon-action delete"
                      title="Desativar"
                      onClick={() => onDelete(manutencao.id, null)}
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

export default ManutencaoList;
