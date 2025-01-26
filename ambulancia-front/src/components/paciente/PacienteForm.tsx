import React, { useState } from "react";
import { Paciente } from "../../types/paciente/PacienteType";
import TelefonePacForm from "./TelefonePacForm";
import EnderecoPacForm from "./EnderecoPacForm";
import ButtonSpinner from "../itens/ButtonSpinner";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
interface PacienteFormProps {
  paciente?: Paciente | null; // Para edição, ou null para criação
  onSave: (paciente: Paciente) => void;
  onCancel: () => void;
  //handleTelefonesChange: () => void;
}

const PacienteForm: React.FC<PacienteFormProps> = ({ paciente, onSave, onCancel }) => {
  const initialFormData: Paciente = {
    id: paciente?.id || 0,
    nomePaciente: paciente?.nomePaciente || "",
    cpf: paciente?.cpf || "",
    sus: paciente?.sus || "",
    condicoesEspecificas: paciente?.condicoesEspecificas || "",
    enderecos: paciente?.enderecos || [],
    telefones: paciente?.telefones || [],
    deletedAt: paciente?.deletedAt || null,
    createdAt:  "",
  };

  const [formData, setFormData] = useState<Paciente>(initialFormData);
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
  const { handleLoad, dismissLoading } = useToast();  const [shouldResetTelefones, setShouldResetTelefones] = useState(false);
  const [shouldResetEnderecos, setShouldResetEnderecos] = useState(false);


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

  const handleCancel = () => {
    setShouldResetTelefones(true); // Define a flag para resetar telefones
    setShouldResetEnderecos(true);
    setTimeout(() => (setShouldResetTelefones(false), setShouldResetEnderecos(false)), 0); // Reseta a flag após o reset
    setFormData(initialFormData); // Redefine o formulário
    onCancel();
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Impede múltiplos envios enquanto está carregando
    setLoading(true); // Bloqueia enquanto a requisição está em andamento
    const toastKey = handleLoad("Carregando...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));  //Para testar o spinner
      onSave(formData); // Chama a função onSave (criação ou edição)
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
    } finally {
      setLoading(false); // Libera o botão após a requisição terminar
      dismissLoading(toastKey);
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
      <TelefonePacForm  onTelefonesChange={handleTelefonesChange} resetTelefones={shouldResetTelefones} isModal={false} />
      <EnderecoPacForm  onEnderecosChange={handleEnderecosChange} resetEnderecos={shouldResetEnderecos}  isModal={false} />
      <div>
        <ButtonSpinner name="Salvar" isLoading={loading} type="submit"/>
        <button type="button" onClick={handleCancel}>
          Limpar
        </button>
      </div>
    </form>
  );
};

export default PacienteForm;
