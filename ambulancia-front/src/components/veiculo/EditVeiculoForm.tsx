import React, { useEffect, useState } from "react";
import ButtonSpinner from "../itens/ButtonSpinner";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import ManutencaoForm from "./ManutencaoForm";
interface VeiculoFormProps {
  veiculo: Veiculo; // Para edição, ou null para criação
  onSave: (updatedVeiculo: Veiculo, notUpdatedVeiculo: Veiculo) => void;
  onCancel: () => void;
  //handleTelefonesChange: () => void;
}

const EditVeiculoForm: React.FC<VeiculoFormProps> = ({ veiculo, onSave }) => {
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
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleManutencoesChange = (manutencoes: Veiculo["manutencoes"]) => {
    setFormData({ ...formData, manutencoes });
  };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Impede múltiplos envios enquanto está carregando

    setIsLoading(true); // Bloqueia enquanto a requisição está em andamento

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));  //Para testar o spinner
      onSave(formData, veiculo); // O formData será comparado com o Veiculo para ver se algum campo foi modificado
    } catch (error) {
      console.error("Erro ao salvar Veiculo:", error);
    } finally {
      setIsLoading(false); // Libera o botão após a requisição terminar
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
          name="sus" 
          placeholder="Ex: classe A, B, C ou D"
          value={formData.classe} 
          onChange={handleInputChange}
          required 
        />
      </div>

      {/* Componente para adicionar telefones */}
      <ManutencaoForm  onManutencoesChange={handleManutencoesChange} isModal={true} manutencoesIniciais={veiculo?.manutencoes || []} />


  
      <div>
        <ButtonSpinner name="Salvar" isLoading={isLoading} type="submit"/>
        {/* <button type="button" onClick={handleCancel}>
          Limpar
        </button> */}
      </div>
    </form>
  );
};

export default EditVeiculoForm;
