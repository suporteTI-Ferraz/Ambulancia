import React, { useState } from "react";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import { FiEdit, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import { GiAutoRepair, GiMechanicGarage } from "react-icons/gi";
import DataCriacao from "../itens/DataFormatada";
import { Fornecedor } from "../../types/veiculo/FornecedorType";

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

     // Ordenar os usuários pela data de criação ou pelo id (ordem decrescente)
      const sortedFornecedores= filteredFornecedores.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
  
    return (
      <div>
        {/* Campo de Pesquisa */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <FiSearch style={{ marginRight: "8px", fontSize: "20px", color: "#007BFF" }} />
          <input
            type="text"
            placeholder="Pesquisar por Nome do Fornecedor"
            value={pesquisarFornecedor}
            onChange={(e) => setPesquisarFornecedor(e.target.value)}
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
  
        {/* Tabela de Veículos */}
        <table>
          <thead>
            <tr>
              <th>Criação</th>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedFornecedores.map((fornecedor) => (
              <tr key={fornecedor.id} style={{ backgroundColor: fornecedor.deletedAt ? '#ffcccc' : 'white' }}>
                <td><DataCriacao createdAt={fornecedor.createdAt} /></td>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.deletedAt ? 'Desativado' : 'Ativo'}</td>
                <td>
                <div className="icon-container">
                  <FiEdit 
                  className="icon-action edit" 
                  title="Editar" 
                  onClick={() => onEdit(fornecedor)} />
              
              
                  {fornecedor.deletedAt ? (
                    <FiRefreshCw
                      className="icon-action reactivate"
                      title="Reativar"
                      onClick={() => onDelete(fornecedor.id, fornecedor.deletedAt)}
                    />
                  ) : (
                    <FiTrash
                      className="icon-action delete"
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