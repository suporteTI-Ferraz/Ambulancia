import React, { useState } from "react";
import { Paciente } from "../../types/paciente/PacienteType";
import TelefonePacForm from "./TelefonePacForm";
import EnderecoPacForm from "./EnderecoPacForm";
interface PacienteFormProps {
  paciente?: Paciente | null; // Para edição, ou null para criação
  onSave: (paciente: Paciente) => void;
  onCancel: () => void;
  //handleTelefonesChange: () => void;
}

const PacienteForm: React.FC<PacienteFormProps> = ({ paciente, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Paciente>({
    id: paciente?.id || 0,
    nomePaciente: paciente?.nomePaciente || "",
    cpf: paciente?.cpf || "",
    sus: paciente?.sus || "",
    condicoesEspecificas: paciente?.condicoesEspecificas || "",
    enderecos: paciente?.enderecos || [],
    telefones: paciente?.telefones || [],
    deletedAt: paciente?.deletedAt || null,
    createdAt: paciente?.createdAt || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTelefonesChange = (telefones: Paciente["telefones"]) => {
    setFormData({ ...formData, telefones });
  };
  const handleEnderecosChange = (enderecos: Paciente["enderecos"]) =>{
    setFormData({...formData, enderecos})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome do Paciente</label>
        <input
          type="text"
          name="nomePaciente"
          value={formData.nomePaciente}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>CPF</label>
        <input 
          type="text"
          name="cpf"
           value={formData.cpf}
           onChange={handleInputChange}
           required
        />
      </div>
      <div>
        <label>SUS</label>
        <input 
          type="text" 
          name="sus" 
          value={formData.sus} 
          onChange={handleInputChange}
          required 
        />
      </div>
      <div>
        <label>Condições Específicas</label>
        <input
          type="text"
          name="condicoesEspecificas"
          value={formData.condicoesEspecificas}
          onChange={handleInputChange}
        />
      </div>

      {/* Componente para adicionar telefones */}
      <TelefonePacForm telefones={formData.telefones} onTelefonesChange={handleTelefonesChange} />
      <EnderecoPacForm enderecos={formData.enderecos} onEnderecosChange={handleEnderecosChange} />
      <div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PacienteForm;
