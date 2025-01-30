import React, { useState } from "react";
import { Hospital } from "../../types/hospital/HospitalType";
import EnderecoHospForm from "./EnderecoHospForm";
import ButtonSpinner from "../itens/ButtonSpinner";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
interface hospitalFormProps {
  hospital?: Hospital | null; // Para edição, ou null para criação
  onSave: (hospital: Hospital) => void;
  onCancel: () => void;
  //handleTelefonesChange: () => void;
}

const HospitalForm: React.FC<hospitalFormProps> = ({ hospital, onSave, onCancel }) => {
  const initialFormData: Hospital = {
    id: hospital?.id || 0,
    nomeHosp: hospital?.nomeHosp || "",
    enderecos: hospital?.enderecos || [],
    deletedAt: hospital?.deletedAt || null,
    createdAt:  "",
  };

  const [formData, setFormData] = useState<Hospital>(initialFormData);
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
  const { handleLoad, dismissLoading } = useToast(); 
  const [shouldResetEnderecos, setShouldResetEnderecos] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEnderecosChange = (enderecos: Hospital["enderecos"]) =>{
    setFormData({...formData, enderecos})
  }

  const handleCancel = () => {
    setShouldResetEnderecos(true);
    setTimeout(() => (setShouldResetEnderecos(false)), 0); // Reseta a flag após o reset
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
      console.error("Erro ao salvar hospital:", error);
    } finally {
      setLoading(false); // Libera o botão após a requisição terminar
      dismissLoading(toastKey);
    }
  };

  

  return (
    
    <form onSubmit={handleSubmit}>
      <div>
      <h4>Hospital</h4>
        <label>Nome</label>
        <input
          type="text"
          name="nomeHosp"
          value={formData.nomeHosp}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Componente para adicionar telefones */}
      <EnderecoHospForm  onEnderecosChange={handleEnderecosChange} resetEnderecos={shouldResetEnderecos}  isModal={false} />
      <div>
        <ButtonSpinner name="Salvar" isLoading={loading} type="submit"/>
        <button type="button" onClick={handleCancel}>
          Limpar
        </button>
      </div>
    </form>
  );
};

export default HospitalForm;
