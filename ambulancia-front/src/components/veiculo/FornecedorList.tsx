import React, { useState } from "react";
import { Fornecedor } from "../../types/veiculo/FornecedorType";
import { FiEdit, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import DataCriacao from "../itens/DataFormatada";
import '../../styles/UserList.css';

interface FornecedorListProps {
  fornecedores: Fornecedor[];
  onEdit: (fornecedor: Fornecedor) => void;
  onDelete: (id: number, deletedAt: string | null) => void;
}

const FornecedorList: React.FC<FornecedorListProps> = ({ fornecedores, onEdit, onDelete }) => {
  const [pesquisarFornecedor, setPesquisarFornecedor] = useState('');

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(pesquisarFornecedor.toLowerCase())
  );

  // Ordenar os fornecedores pela data de criação ou pelo id (ordem decrescente)
  const sortedFornecedores = filteredFornecedores.sort((a, b) => {
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
          placeholder="Pesquisar por Nome do Fornecedor"
          value={pesquisarFornecedor}
          onChange={(e) => setPesquisarFornecedor(e.target.value)}
        />
      </div>

      {/* Tabela de Fornecedores */}
      <table className="custom-table">
        <thead>
          <tr className="custom-th-tr">
            <th className="custom-th">Criação</th>
            <th className="custom-th">Nome</th>
            <th className="custom-th">CNPJ</th>
            <th className="custom-th">Telefone</th>
            <th className="custom-th">Status</th>
            <th className="custom-th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedFornecedores.map((fornecedor) => (
            <tr
              key={fornecedor.id}
              // Aplica a classe de cor de fundo com base no status do usuário (ativo ou desativado)
              className={fornecedor.deletedAt ? 'row-deleted' : 'row-active'}
            >
              <td className="custom-td"><DataCriacao createdAt={fornecedor.createdAt} /></td>
              <td className="custom-td">{fornecedor.nome}</td>
              <td className="custom-td">{fornecedor.cnpj}</td>
              <td className="custom-td">{fornecedor.telefone}</td>
              <td className='custom-td'>
                <span className={fornecedor.deletedAt ? 'status-desativado' : 'status-ativo'}>
                  {fornecedor.deletedAt ? 'Desativado' : 'Ativo'}
                </span>
              </td>
              <td className="custom-td">
                <div className="icon-container">
                  <FiEdit
                    className="custom-icon-action edit"
                    title="Editar"
                    onClick={() => onEdit(fornecedor)}
                  />
                  {fornecedor.deletedAt ? (
                    <FiRefreshCw
                      className="custom-icon-action reactivate"
                      title="Reativar"
                      onClick={() => onDelete(fornecedor.id, fornecedor.deletedAt)}
                    />
                  ) : (
                    <FiTrash
                      className="custom-icon-action delete"
                      title="Desativar"
                      onClick={() => onDelete(fornecedor.id, null)}
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

export default FornecedorList;
