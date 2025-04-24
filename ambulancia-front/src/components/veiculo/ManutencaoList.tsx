
import React, { useState } from "react";
import { FiEdit, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import Manutencao from "../../types/veiculo/ManutencaoType";
import DataCriacao from "../itens/DataFormatada";
import "../../styles/UserList.css"; // To align with VeiculoList styling

interface FornecedorListProps {
  manutencoes: Manutencao[];
  onEdit: (manutencao: Manutencao) => void;
  onDelete: (id: number, deletedAt: string | null) => void;
}

const ManutencaoList: React.FC<FornecedorListProps> = ({ manutencoes, onEdit, onDelete }) => {
  const [pesquisarManutencao, setPesquisarManutencao] = useState('');

  const filteredManutencoes = manutencoes.filter(manutencao =>
    manutencao.dataEntradaManutencao?.toLowerCase().includes(pesquisarManutencao.toLowerCase()) ||
    manutencao.descricaoProblema?.toLowerCase().includes(pesquisarManutencao.toLowerCase())
  );

  // Ordenar por data de criação ou id (ordem decrescente)
  const sortedManutencoes = filteredManutencoes.sort((a, b) => {
    return new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime();
  });

  return (
    <div className="form-section2-funcionario">
      {/* Campo de Pesquisa */}
      <div className="custom-search-container">
        <FiSearch className="custom-search-icon-user-list" />
        <input
          className="custom-input-search"
          type="text"
          placeholder="Pesquisar por Data ou Descrição"
          value={pesquisarManutencao}
          onChange={(e) => setPesquisarManutencao(e.target.value)}
        />
      </div>
      {/* Tabela de Manutenções */}
      <table className="custom-table">
        <thead>
          <tr className="custom-th-tr">
            <th className="custom-th">Tipo</th>
            <th className="custom-th">Data Entrada</th>
            <th className="custom-th">Data Saída</th>
            <th className="custom-th">Custo Mão Obra</th>
            <th className="custom-th">Custo Peças</th>
            <th className="custom-th">Situação</th>
            <th className="custom-th">Descrição Problema</th>
            <th className="custom-th">Serviço Realizado</th>
            <th className="custom-th">Status</th>
            <th className="custom-th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedManutencoes.map((manutencao) => (
            <tr
              key={manutencao.id}
              className={`custom-tr ${manutencao.deletedAt ? 'row-deleted' : 'row-active'}`}
            >
              <td className="custom-td">{manutencao.tipoManutencao}</td>
              <td className="custom-td"><DataCriacao createdAt={manutencao.dataEntradaManutencao} /></td>
              <td className="custom-td"><DataCriacao createdAt={manutencao.dataSaidaManutencao} /></td>
              <td className="custom-td">{manutencao.custoMaoObra !== undefined ? `R$ ${manutencao.custoMaoObra.toFixed(2)}` : "-"}</td>
              <td className="custom-td">{manutencao.custoPecas !== undefined ? `R$ ${manutencao.custoPecas.toFixed(2)}` : "-"}</td>
              <td className="custom-td">{manutencao.status}</td>
              <td className="custom-td">{manutencao.descricaoProblema}</td>
              <td className="custom-td">{manutencao.servicoRealizado}</td>
              <td className="custom-td">
                <span className={manutencao.deletedAt ? 'status-desativado' : 'status-ativo'}>
                  {manutencao.deletedAt ? 'Desativado' : 'Ativo'}
                </span>
              </td>
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
