import React, { useEffect, useState } from "react";
import { EnderecoHosp } from "../../types/hospital/EnderecoHospType";
import { Hospital } from "../../types/hospital/HospitalType";
import ButtonSpinner from "../itens/ButtonSpinner";
import EnderecoHospForm from "./EnderecoHospForm";
interface HospitalFormProps {
  hospital: Hospital; // Para edição, ou null para criação
  onSave: (updatedHospital: Hospital, notUpdatedHospital: Hospital) => void;
  onCancel: () => void;
  //handleTelefonesChange: () => void;
}

const EdithospitalForm: React.FC<HospitalFormProps> = ({ hospital, onSave }) => {
  const initialFormData: Hospital = {
    id: hospital?.id || 0,
    nomeHosp: hospital?.nomeHosp || "",
    enderecos: hospital?.enderecos || [],
    deletedAt: hospital?.deletedAt || null,
    createdAt: hospital?.createdAt || "",
  };

  const [formData, setFormData] = useState<Hospital>(initialFormData);
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [currentEnderecos, setCurrentEnderecos] = useState<EnderecoHosp[]>([]);


 useEffect(() => {
        setCurrentEnderecos(hospital?.enderecos || []); // Telefones para edição no formulário
     }, [hospital?.enderecos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleEnderecosChange = (enderecos: Hospital["enderecos"]) =>{
    setFormData({...formData, enderecos})
  }




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Impede múltiplos envios enquanto está carregando

    setIsLoading(true); // Bloqueia enquanto a requisição está em andamento

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));  //Para testar o spinner
      onSave(formData, hospital); // O formData será comparado com o hospital para ver se algum campo foi modificado
    } catch (error) {
      console.error("Erro ao salvar hospital:", error);
    } finally {
      setIsLoading(false); // Libera o botão após a requisição terminar
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

      <EnderecoHospForm
  onEnderecosChange={handleEnderecosChange}
  resetEnderecos={false}
  isModal={true}
  enderecosIniciais={hospital?.enderecos || []} // Passando os endereços existentes
/>
      <div className="div-botao-modal-hospital">
        <ButtonSpinner name="Salvar" isLoading={isLoading} type="submit" classe={""}/>
        {/* <button type="button" onClick={handleCancel}>
          Limpar
        </button> */}
      </div>
    </form>
  );
};

export default EdithospitalForm;
