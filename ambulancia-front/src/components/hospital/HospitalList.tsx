import React, { useState } from "react";
import { Hospital } from "../../types/hospital/HospitalType";
import { FiEdit, FiPhone, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import { FaMapLocationDot } from "react-icons/fa6";
import DataCriacao from "../itens/DataFormatada";

interface HospitalListProps {
  hospitais: Hospital[];
  onEdit: (hospital: Hospital) => void;
  onDelete: (id: number, deletedAt: string | null) => void;
  onViewEnderecos: (hospital: Hospital) => void;
}


const HospitalList: React.FC<HospitalListProps> = ({ hospitais, onEdit, onViewEnderecos, onDelete }) => {
    const [pesquisarHospital, setPesquisarHospital] = useState('');

    const filteredHospitais = hospitais.filter(hospital =>
      hospital.nomeHosp.toLowerCase().includes(pesquisarHospital.toLowerCase()) ||
      hospital.enderecos.some(endereco => endereco.ruaHosp.toLowerCase().includes(pesquisarHospital.toLowerCase()))
    );

     // Ordenar os usuários pela data de criação ou pelo id (ordem decrescente)
     const sortedHospitais = filteredHospitais.sort((a, b) => {
      // Opção 1: Ordenar pelo id (decrescente)
      // return b.id - a.id;
  
      // Opção 2: Ordenar pela data de criação (decrescente)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
  
    return (
      <div>
        {/* Campo de Pesquisa */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <FiSearch style={{ marginRight: "8px", fontSize: "20px", color: "#007BFF" }} />
          <input
            type="text"
            placeholder="Pesquisar por Nome ou Rua"
            value={pesquisarHospital}
            onChange={(e) => setPesquisarHospital(e.target.value)}
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
  
        {/* Tabela de hospitais */}
        <table>
          <thead>
            <tr>
              <th>Criação</th>
              <th>Nome</th>
              <th>Cep</th>
              <th>Estado</th>
              <th>Rua</th>
              <th>Bairro</th>
              <th>Número</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
  {sortedHospitais.map((hospital) => (
    <tr key={hospital.id} style={{ backgroundColor: hospital.deletedAt ? '#ffcccc' : 'white' }}>
      <td><DataCriacao createdAt={hospital.createdAt} /></td>
      <td>{hospital.nomeHosp}</td>
      <td>{hospital.enderecos.map((endereco) => endereco.cepHosp).join(", ")}</td>
      <td>{hospital.enderecos.map((endereco) => endereco.estadoHosp).join(", ")}</td>
      <td>{hospital.enderecos.map((endereco) => endereco.ruaHosp).join(", ")}</td>
      <td>{hospital.enderecos.map((endereco) => endereco.bairroHosp).join(", ")}</td>
      <td>{hospital.enderecos.map((endereco) => endereco.numeroHosp).join(", ")}</td>
      <td>{hospital.deletedAt ? 'Desativado' : 'Ativo'}</td>
      <td>
        <div className="icon-container">
          <FiEdit 
            className="icon-action edit" 
            title="Editar" 
            onClick={() => onEdit(hospital)} 
          />
          <FaMapLocationDot
            className="icon-action endereco" 
            title="Visualizar Endereços"
            onClick={() => onViewEnderecos(hospital)}
          />
          {hospital.deletedAt ? (
            <FiRefreshCw
              className="icon-action reactivate"
              title="Reativar"
              onClick={() => onDelete(hospital.id, hospital.deletedAt)}
            />
          ) : (
            <FiTrash
              className="icon-action delete"
              title="Desativar"
              onClick={() => onDelete(hospital.id, null)}
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
  
  export default HospitalList;