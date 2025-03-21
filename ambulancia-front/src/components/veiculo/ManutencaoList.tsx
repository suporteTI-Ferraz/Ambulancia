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

     // Ordenar os usuários pela data de criação ou pelo id (ordem decrescente)
      const sortedManutencoes= filteredManutencoes.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
  
    return (
      <div>
        {/* Campo de Pesquisa */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <FiSearch style={{ marginRight: "8px", fontSize: "20px", color: "#007BFF" }} />
          <input
            type="text"
            placeholder="Pesquisar por Data da Manutenção"
            value={pesquisarManutencao}
            onChange={(e) => setPesquisarManutencao(e.target.value)}
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
              <th>Tipo</th>
              <th>Data de Entrada da Manutenção</th>
              <th>Data de Saída da Manutenção</th>
              <th>Custo</th>
              <th>Situação</th>
              <th>Descrição</th>
              <th>Serviço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedManutencoes.map((manutencao) => (
              <tr key={manutencao.id} style={{ backgroundColor: manutencao.deletedAt ? '#ffcccc' : 'white' }}>
                <td><DataCriacao createdAt={manutencao.createdAt} /></td>
                <td>{manutencao.tipoManutencao}</td>
                <td><DataCriacao createdAt={manutencao.dataEntradaManutencao} /></td>
                <td><DataCriacao createdAt={manutencao.dataSaidaManutencao} /></td>
                <td>{manutencao.custoManutencao}</td>
                <td>{manutencao.status}</td>
                <td>{manutencao.descricaoProblema}</td>
                <td>{manutencao.servicoRealizado}</td>
                <td>{manutencao.deletedAt ? 'Desativado' : 'Ativo'}</td>
                <td>
                <div className="icon-container">
                  <FiEdit 
                  className="icon-action edit" 
                  title="Editar" 
                  onClick={() => onEdit(manutencao)} />
              
              
                  {manutencao.deletedAt ? (
                    <FiRefreshCw
                      className="icon-action reactivate"
                      title="Reativar"
                      onClick={() => onDelete(manutencao.id, manutencao.deletedAt)}
                    />
                  ) : (
                    <FiTrash
                      className="icon-action delete"
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