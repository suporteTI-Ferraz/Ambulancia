import React, { useState } from "react";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import { FiEdit, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import { GiAutoRepair } from "react-icons/gi";
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

     // Ordenar os usuários pela data de criação ou pelo id (ordem decrescente)
      const sortedVeiculos = filteredVeiculos.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
  
    return (
      <div>
        {/* Campo de Pesquisa */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <FiSearch style={{ marginRight: "8px", fontSize: "20px", color: "#007BFF" }} />
          <input
            type="text"
            placeholder="Pesquisar por Placa de Veículo"
            value={pesquisarVeiculo}
            onChange={(e) => setPesquisarVeiculo(e.target.value)}
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
              <th>Placa</th>
              <th>Quilometragem</th>
              <th>Classe</th>
              <th>Manutenções</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedVeiculos.map((veiculo) => (
              <tr key={veiculo.id} style={{ backgroundColor: veiculo.deletedAt ? '#ffcccc' : 'white' }}>
                <td><DataCriacao createdAt={veiculo.createdAt} /></td>
                <td>{veiculo.placaVeic}</td>
                <td>{veiculo.quilometragem}</td>
                <td>{veiculo.classe}</td>
                <td>
                  {veiculo.manutencoes.map((manutencao) => (
                    <div key={manutencao.id}> Tipo: {manutencao.tipoManutencao}, Valor: {manutencao.custoManutencao}</div>
                  ))}
                </td>
                <td>{veiculo.deletedAt ? 'Desativado' : 'Ativo'}</td>
                <td>
                <div className="icon-container">
                  <FiEdit 
                  className="icon-action edit" 
                  title="Editar" 
                  onClick={() => onEdit(veiculo)} />
                  <GiAutoRepair
                  className="icon-action manutencao" 
                    title="Visualizar Manutenções"
                    onClick={() => onViewManutencoes(veiculo)}
                  />
                  {veiculo.deletedAt ? (
                    <FiRefreshCw
                      className="icon-action reactivate"
                      title="Reativar"
                      onClick={() => onDelete(veiculo.id, veiculo.deletedAt)}
                    />
                  ) : (
                    <FiTrash
                      className="icon-action delete"
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