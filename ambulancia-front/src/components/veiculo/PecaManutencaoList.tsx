import React, { useState } from "react";
import { FiEdit, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import PecaManutencao from "../../types/veiculo/PecaManutencaoType";
import DataCriacao from "../itens/DataFormatada";

interface PecaManutencaoListProps {
  pecaManutencoes: PecaManutencao[];
  onEdit: (pecaManutencao: PecaManutencao) => void;
  onDelete: (id: number, deletedAt: string | null) => void;
}


const PecaManutencaoList: React.FC<PecaManutencaoListProps> = ({ pecaManutencoes, onEdit, onDelete }) => {
    const [pesquisarPecaManutencao, setPesquisarPecaManutencao] = useState('');

    const filteredPecaManutencoes = pecaManutencoes.filter(peca =>
      peca.createdAt.toLowerCase().includes(pesquisarPecaManutencao.toLowerCase())
    );

     // Ordenar os usuários pela data de criação ou pelo id (ordem decrescente)
      const sortedPecaManutencoes= filteredPecaManutencoes.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
  
    return (
      <div>
        {/* Campo de Pesquisa */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <FiSearch style={{ marginRight: "8px", fontSize: "20px", color: "#007BFF" }} />
          <input
            type="text"
            placeholder="Pesquisar por Data de Criação"
            value={pesquisarPecaManutencao}
            onChange={(e) => setPesquisarPecaManutencao(e.target.value)}
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
              <th>Data de criação</th>
              <th>Nome da Peça</th>
              <th>Quantidade</th>
              <th>Custo da Peça</th>
              <th>Data de Saída da Manutenção</th>
              <th>Custo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedPecaManutencoes.map((peca) => (
              <tr key={peca.id} style={{ backgroundColor: peca.deletedAt ? '#ffcccc' : 'white' }}>
                <td><DataCriacao createdAt={peca.createdAt} /></td>
                <td>{peca.nomePeca}</td>
                <td>{peca.quantidade}</td>
                <td>{peca.custoUnitario}</td>
                {/* Data de teste, substituir por data de entrada da manutenção */}
                <td>12/09/25</td>
                <td>{peca.custoUnitario*peca.quantidade}</td>

                <td>{peca.deletedAt ? 'Desativado' : 'Ativo'}</td>
                <td>
                <div className="icon-container">
                  <FiEdit 
                  className="icon-action edit" 
                  title="Editar" 
                  onClick={() => onEdit(peca)} />
              
              
                  {peca.deletedAt ? (
                    <FiRefreshCw
                      className="icon-action reactivate"
                      title="Reativar"
                      onClick={() => onDelete(peca.id, peca.deletedAt)}
                    />
                  ) : (
                    <FiTrash
                      className="icon-action delete"
                      title="Desativar"
                      onClick={() => onDelete(peca.id, null)}
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
  
  export default PecaManutencaoList;