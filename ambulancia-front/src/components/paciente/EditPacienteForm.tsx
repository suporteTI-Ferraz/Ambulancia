import React, { useEffect, useState } from "react";
import { Paciente } from "../../types/paciente/PacienteType";
import TelefonePacForm from "./TelefonePacForm";
import EnderecoPacForm from "./EnderecoPacForm";
import ButtonSpinner from "../itens/ButtonSpinner";
import { EnderecoPac } from "../../types/paciente/EnderecoPacType";
interface PacienteFormProps {
  paciente: Paciente; // Para edição, ou null para criação
  onSave: (updatedPaciente: Paciente, notUpdatedPaciente: Paciente) => void;
  onCancel: () => void;
  //handleTelefonesChange: () => void;
}

const EditPacienteForm: React.FC<PacienteFormProps> = ({ paciente, onSave }) => {
  const initialFormData: Paciente = {
    id: paciente?.id || 0,
    nomePaciente: paciente?.nomePaciente || "",
    cpf: paciente?.cpf || "",
    sus: paciente?.sus || "",
    condicoesEspecificas: paciente?.condicoesEspecificas || "",
    enderecos: paciente?.enderecos || [],
    telefones: paciente?.telefones || [],
    deletedAt: paciente?.deletedAt || null,
    createdAt: paciente?.createdAt || "",
  };

  const [formData, setFormData] = useState<Paciente>(initialFormData);
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [currentEnderecos, setCurrentEnderecos] = useState<EnderecoPac[]>([]);


 useEffect(() => {
        setCurrentEnderecos(paciente?.enderecos || []); // Telefones para edição no formulário
     }, [paciente?.enderecos]);

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




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Impede múltiplos envios enquanto está carregando

    setIsLoading(true); // Bloqueia enquanto a requisição está em andamento

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));  //Para testar o spinner
      onSave(formData, paciente); // O formData será comparado com o paciente para ver se algum campo foi modificado
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
    } finally {
      setIsLoading(false); // Libera o botão após a requisição terminar
    }
  };

  

  return (
    
    <form onSubmit={handleSubmit}>
      <div>
      <h4>Paciente</h4>
        <label>Nome Completo</label>
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
          placeholder="(EX: Cadeirante)"
          value={formData.condicoesEspecificas}
          onChange={handleInputChange}
        />
      </div>

      {/* Componente para adicionar telefones */}
      <TelefonePacForm  
      onTelefonesChange={handleTelefonesChange} 
      resetTelefones={false} 
      isModal={true}
      telefonesIniciais={paciente?.telefones || []} // Passando os endereços existentes

      />

      <EnderecoPacForm
  onEnderecosChange={handleEnderecosChange}
  resetEnderecos={false}
  isModal={true}
  enderecosIniciais={paciente?.enderecos || []} // Passando os endereços existentes
/>
      <div>
        <ButtonSpinner name="Salvar" isLoading={isLoading} type="submit"/>
        {/* <button type="button" onClick={handleCancel}>
          Limpar
        </button> */}
      </div>
    </form>
  );
};

export default EditPacienteForm;
