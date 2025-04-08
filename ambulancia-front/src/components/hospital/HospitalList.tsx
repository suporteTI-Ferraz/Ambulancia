import React, { useState } from "react";
import { Hospital } from "../../types/hospital/HospitalType";
import { FiEdit, FiPhone, FiRefreshCw, FiSearch, FiTrash } from "react-icons/fi";
import { FaMapLocationDot } from "react-icons/fa6";
import DataCriacao from "../itens/DataFormatada";
import "../../styles/HospitalList.css";

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

  // Ordenar os hospitais pela data de criação ou pelo id (ordem decrescente)
  const sortedHospitais = filteredHospitais.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="form-section2-hospitais">
      {/* Campo de Pesquisa */}
      <div className="custom-div-form-section2-search" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div className="custom-search-container">
          <FiSearch className="custom-search-icon-user-list" />
          <input
            className="custom-input-search"
            type="text"
            placeholder="Pesquisar por Nome ou Rua"
            value={pesquisarHospital}
            onChange={(e) => setPesquisarHospital(e.target.value)}
          />
        </div>
      </div>

      {/* Tabela de hospitais */}
      <table className="custom-table">
        <thead className="custom-title-table">
          <tr className="custom-tr">
            <th className="custom-th-tr">Criação</th>
            <th className="custom-th-tr">Nome</th>
            <th className="custom-th-tr">CEP</th>
            <th className="custom-th-tr">Estado</th>
            <th className="custom-th-tr">Rua</th>
            <th className="custom-th-tr">Bairro</th>
            <th className="custom-th-tr">Número</th>
            <th className="custom-th-tr">Status</th>
            <th className="custom-th-tr">Ações</th>
          </tr>
        </thead>

        <tbody className="custom-body-table">
          {sortedHospitais.map((hospital) => (
            <tr key={hospital.id} className={hospital.deletedAt ? "row-deleted" : "row-active"}>
              <td className="custom-td"><DataCriacao createdAt={hospital.createdAt} /></td>
              <td className="custom-td">{hospital.nomeHosp}</td>
              <td className="custom-td">{hospital.enderecos.map((endereco) => endereco.cepHosp).join(", ")}</td>
              <td className="custom-td">{hospital.enderecos.map((endereco) => endereco.estadoHosp).join(", ")}</td>
              <td className="custom-td">{hospital.enderecos.map((endereco) => endereco.ruaHosp).join(", ")}</td>
              <td className="custom-td">{hospital.enderecos.map((endereco) => endereco.bairroHosp).join(", ")}</td>
              <td className="custom-td">{hospital.enderecos.map((endereco) => endereco.numeroHosp).join(", ")}</td>
              <td className="custom-td">
                <span className={hospital.deletedAt ? "status-desativado" : "status-ativo"}>
                  {hospital.deletedAt ? "Desativado" : "Ativo"}
                </span>
              </td>
              <td className="custom-td">
                <div className="icon-container">
                  <FiEdit
                    className="custom-icon-action edit"
                    title="Editar"
                    onClick={() => onEdit(hospital)}
                  />

                  {hospital.deletedAt ? (
                    <FiRefreshCw
                      className="custom-icon-action reactivate"
                      title="Reativar"
                      onClick={() => onDelete(hospital.id, hospital.deletedAt)}
                    />
                  ) : (
                    <FiTrash
                      className="custom-icon-action delete"
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
