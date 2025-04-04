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
      <div className="form-section2-funcionario">
        {/* Campo de Pesquisa */}
        <div className="custom-search-container">
          <FiSearch className="custom-search-icon-user-list" />
          <input
            className="custom-input-search"
            type="text"
            placeholder="Pesquisar por Data de Criação"
            value={pesquisarPecaManutencao}
            onChange={(e) => setPesquisarPecaManutencao(e.target.value)}
          />
        </div>
    
        {/* Tabela de Veículos */}
        <table className="custom-table">
          <thead>
            <tr className="custom-th-tr">
              <th className="custom-th">Data de Criação</th>
              <th className="custom-th">Nome da Peça</th>
              <th className="custom-th">Quantidade</th>
              <th className="custom-th">Custo da Peça</th>
              <th className="custom-th">Data de Saída da Manutenção</th>
              <th className="custom-th">Custo</th>
              <th className="custom-th">Status</th>
              <th className="custom-th">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedPecaManutencoes.map((peca) => (
              <tr
                key={peca.id}
                className="custom-tr"
                style={{ backgroundColor: peca.deletedAt ? '#ffcccc' : 'white' }}
              >
                <td className="custom-td"><DataCriacao createdAt={peca.createdAt} /></td>
                <td className="custom-td">{peca.nomePeca}</td>
                <td className="custom-td">{peca.quantidade}</td>
                <td className="custom-td">{peca.custoUnitario}</td>
                <td className="custom-td">12/09/25</td>
                <td className="custom-td">{peca.custoUnitario * peca.quantidade}</td>
                <td className="custom-td">{peca.deletedAt ? 'Desativado' : 'Ativo'}</td>
                <td className="custom-td">
                  <div className="icon-container">
                    <FiEdit
                      className="custom-icon-action edit"
                      title="Editar"
                      onClick={() => onEdit(peca)}
                    />
                    {peca.deletedAt ? (
                      <FiRefreshCw
                        className="custom-icon-action reactivate"
                        title="Reativar"
                        onClick={() => onDelete(peca.id, peca.deletedAt)}
                      />
                    ) : (
                      <FiTrash
                        className="custom-icon-action delete"
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