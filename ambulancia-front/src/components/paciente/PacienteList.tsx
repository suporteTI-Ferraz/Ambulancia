import React from "react";
import { Paciente } from "../../types/paciente/PacienteType";
import { TelefonePac } from "../../types/paciente/TelefonePacType";
import { FiEdit, FiPhone } from "react-icons/fi";
import { FaMapLocationDot } from "react-icons/fa6";


interface PacienteListProps {
  pacientes: Paciente[];
  onEdit: (paciente: Paciente) => void;
  onViewTelefones: (paciente: Paciente) => void;
  onViewEnderecos: (paciente: Paciente) => void;
  setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
}


const PacienteList: React.FC<PacienteListProps> = ({ pacientes, onEdit, onViewTelefones, onViewEnderecos }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>SUS</th>
          <th>Telefones</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((paciente) => (
          <tr key={paciente.id}>
            <td>{paciente.id}</td>
            <td>{paciente.nomePaciente}</td>
            <td>{paciente.cpf}</td>
            <td>{paciente.sus}</td>
            <td>
              {paciente.telefones.map((telefone) => (
                <div key={telefone.id}>
                  {telefone.tipoTel}: {telefone.numTel}
                </div>
              ))}
            </td>
            <td>
              <FiEdit title="Editar" onClick={() => onEdit(paciente)} />
              <FaMapLocationDot
                title="Visualizar Endereços"
                onClick={() => onViewEnderecos(paciente)}
              />
              <FiPhone
                title="Visualizar Telefones"
                onClick={() => onViewTelefones(paciente)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PacienteList;
