import React, { useState } from "react";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import Manutencao from "../../types/veiculo/ManutencaoType";
import ButtonSpinner from "../itens/ButtonSpinner";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import ManutencaoForm from "./ManutencaoForm";
interface PacienteFormProps {
  veiculo?: Veiculo | null; // Para edição, ou null para criação
  onSave: (veiculo: Veiculo) => void;
  onCancel: () => void;
  //handleTelefonesChange: () => void;
}

const VeiculoForm: React.FC<PacienteFormProps> = ({ veiculo, onSave, onCancel }) => {
  const initialFormData: Veiculo = {
    id: veiculo?.id || 0,
    placaVeic: veiculo?.placaVeic || "",
    quilometragem: veiculo?.quilometragem || 0.0,
    classe: veiculo?.classe || "",
    manutencoes: veiculo?.manutencoes || [],
    deletedAt: veiculo?.deletedAt || null,
    createdAt:  "",
  };

  const [formData, setFormData] = useState<Veiculo>(initialFormData);
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
  const { handleLoad, dismissLoading } = useToast();  
  const [shouldResetManutencoes, setShouldResetManuencoes] = useState(false);
//   const [shouldResetEnderecos, setShouldResetEnderecos] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleManutencoesChange = (manutencoes: Veiculo["manutencoes"]) => {
    setFormData({ ...formData, manutencoes });
  };
//   const handleMultasChange = (multas: Veiculo["multas"]) =>{
//     setFormData({...formData, multas})
//   }

  const handleCancel = () => {
    setShouldResetManuencoes(true); // Define a flag para resetar telefones
    // setShouldResetMultas(true);
    setTimeout(() => (setShouldResetManuencoes(false)), 0); // Reseta a flag após o reset
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
      console.error("Erro ao salvar veículo:", error);
    } finally {
      setLoading(false); // Libera o botão após a requisição terminar
      dismissLoading(toastKey);
    }
  };

  

  return (
    
    <form onSubmit={handleSubmit}>
      <div>
      <h4>Veículo</h4>
        <label>Placa do Veículo</label>
        <input
          type="text"
          name="placaVeic"
          value={formData.placaVeic}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
      <label>Quilometragem</label>
        <input 
            type="number" 
            step="0.01
            " // Permite valores decimais
            name="quilometragem"
            value={formData.quilometragem}
            onChange={handleInputChange}
            required
        />
      </div>
      <div>
        <label>Classe</label>
        <input 
          type="text" 
          name="classe" 
          placeholder="Ex: classe A, B, C ou D"
          value={formData.classe} 
          onChange={handleInputChange}
          required 
        />
      </div>

      {/* Componente para adicionar telefones */}

      {/* <ManutencaoForm  onTelefonesChange={handleTelefonesChange} resetTelefones={shouldResetTelefones} isModal={false} /> */}
      
      <div>
        <ButtonSpinner name="Salvar" isLoading={loading} type="submit"/>
        <button type="button" onClick={handleCancel}>
          Limpar
        </button>
      </div>
    </form>
  );
};

export default VeiculoForm;
