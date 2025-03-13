import React, { useState } from "react";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import Manutencao from "../../types/veiculo/ManutencaoType";
import ButtonSpinner from "../itens/ButtonSpinner";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../hooks/useToast";
import ManutencaoForm from "./ManutencaoForm";
import DatePicker from "react-datepicker";
interface PacienteFormProps {
  veiculoToEdit: Veiculo | null; // Para edição, ou null para criação
  onSave: (veiculo: Veiculo) => void;
  onUpdate: (id: number, veiculo: Veiculo) => void;
  onCancel: () => void;
  isModal: Boolean; 
  //handleTelefonesChange: () => void;
}

const VeiculoForm: React.FC<PacienteFormProps> = ({ veiculoToEdit, onSave, onUpdate, onCancel, isModal }) => {
  const initialFormData: Veiculo = {
    id: veiculoToEdit?.id || 0,
    placaVeic: veiculoToEdit?.placaVeic || "",
    quilometragemAtual: veiculoToEdit?.quilometragemAtual || 0,
    classe: veiculoToEdit?.classe || "",
    manutencoes: veiculoToEdit?.manutencoes || [],
    deletedAt: veiculoToEdit?.deletedAt || null,
    createdAt:  "",
    modeloVeic: veiculoToEdit?.modeloVeic || "",
    marcaVeic: veiculoToEdit?.marcaVeic || "",
    anoFabricacao: veiculoToEdit?.anoFabricacao || "",
    chassi: veiculoToEdit?.chassi || "",
  };

  const [formData, setFormData] = useState<Veiculo>(initialFormData);
  const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
  const { handleLoad, dismissLoading } = useToast();  
//   const [shouldResetEnderecos, setShouldResetEnderecos] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


//   const handleMultasChange = (multas: Veiculo["multas"]) =>{
//     setFormData({...formData, multas})
//   }

  const handleCancel = () => {
    setFormData(initialFormData); // Redefine o formulário
    onCancel();
  };

  const filterYear = (date: Date) => {
    // Permite apenas a seleção de anos
    return date.getMonth() === 0 && date.getDate() === 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Impede múltiplos envios enquanto está carregando
    setLoading(true); // Bloqueia enquanto a requisição está em andamento
    const toastKey = handleLoad("Carregando...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));  //Para testar o spinner
      if (veiculoToEdit && isModal) {
        onUpdate(veiculoToEdit.id, formData);
      } else {
        onSave(formData); // Chama a função onSave (criação ou edição)
      }
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
        <div >
        <label>Ano de Fabricação</label>
        <DatePicker
        selected={formData.anoFabricacao ? new Date(formData.anoFabricacao) : null}
        onChange={(date) => setFormData({ ...formData, anoFabricacao: date?.toISOString().split("T")[0] || "" })}
        locale="pt-BR"
        dateFormat="yyyy"
        showYearPicker
        filterDate={filterYear}
        maxDate={new Date()}  // 🔥 Impede seleção de datas futuras
        placeholderText="AAAA"
        popperPlacement="left-end" // 🔥 Força o DatePicker para baixo
      />
            </div>
      <div>
        <label>Chassi</label>
        <input 
          type="text" 
          name="chassi" 
          value={formData.chassi} 
          onChange={handleInputChange}
          required 
        />
      </div>
      <div>
        <label>Marca</label>
        <input 
          type="text" 
          name="marcaVeic" 
          value={formData.marcaVeic} 
          onChange={handleInputChange}
          required 
        />
      </div>
      <div>
        <label>Modelo</label>
        <input 
          type="text" 
          name="modeloVeic" 
          value={formData.modeloVeic} 
          onChange={handleInputChange}
          required 
        />
      </div>
      <div>
      <label>Quilometragem</label>
        <input 
            type="number" 
           
            name="quilometragemAtual"
            value={formData.quilometragemAtual}
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
      <ButtonSpinner name={isModal ? 'Atualizar' : 'Criar'} isLoading={loading} type="submit"/>
        <button type="button" onClick={handleCancel}>
          Limpar
        </button>
      </div>
    </form>
  );
};

export default VeiculoForm;
