import React, { useEffect, useState } from "react";
import { TelefonePac } from "../../types/paciente/TelefonePacType";

interface TelefoneFormProps {
  onTelefonesChange: (telefones: TelefonePac[]) => void; // Callback para alterações
  resetTelefones?: boolean; // Flag para resetar telefones
  isModal: Boolean; //Se for preciso no futuro, estiliza o botão de adicionar telefones inline se for modal
  telefonesIniciais?: TelefonePac[];
}

const TelefonePacForm: React.FC<TelefoneFormProps> = ({ onTelefonesChange, resetTelefones, telefonesIniciais = [], }) => {
  const [localTelefones, setLocalTelefones] = useState<TelefonePac[]>([{ id: 0, tipoTel: "CELULAR", numTel: "", deletedAt: null }]);
  const [isEditPaciente, setIsEditPaciente] = useState<boolean>()
 

   useEffect(() => {
        // Inicializar com os endereços existentes, se houver
        if (telefonesIniciais.length > 0) {
          setLocalTelefones(telefonesIniciais);
          setIsEditPaciente(true);
        }
      }, [telefonesIniciais]);
  
    // Resetar telefones ao clicar em "Limpar"
    useEffect(() => {
      if (resetTelefones) {
        setLocalTelefones([{ id: 0, tipoTel: "", numTel: "", deletedAt: null }]);
        onTelefonesChange([]);
      }
    }, [resetTelefones, onTelefonesChange]);

  // Função para adicionar um novo tefone à lista
  const handleAddTelefone = () => {
    const novoTelefone = { id: localTelefones.length, tipoTel: "CELULAR", numTel: "", deletedAt: null };
    const updatedTelefones = [...localTelefones, novoTelefone];
    setLocalTelefones(updatedTelefones);
    onTelefonesChange(updatedTelefones);
  };

  // Função para atualizar um telefone na lista
  const handleTelefoneChange = (index: number, field: keyof TelefonePac, value: string) => {
    const updatedTelefones = localTelefones.map((telefone, i) =>
      i === index ? { ...telefone, [field]: value  } : telefone // Garante valor válido
    );
    setLocalTelefones(updatedTelefones);
    onTelefonesChange(updatedTelefones);
  };

  const handleRemoveTelefone = (index: number) => {
    const updatedTelefones = localTelefones.filter((_, i) => i !== index);
    setLocalTelefones(updatedTelefones);
    onTelefonesChange(updatedTelefones);
  };

  return (
    <div className="form-container">
      <h4>Telefones</h4>
      {localTelefones.map((telefone, index) => (
        <div key={index} className="forms-sec-container">
            <div>
            <label>Tipo</label>
            <select
              value={telefone.tipoTel}
              onChange={(e) => handleTelefoneChange(index, "tipoTel", e.target.value)}
            >
         
          <option value="CELULAR">Celular</option>
          <option value="FIXO">Fixo</option>
            </select>
          </div>
          <div>
            <label>Número</label>
            <input
              type="text"
              value={telefone.numTel}
              onChange={(e) =>
                handleTelefoneChange(index, "numTel", e.target.value)
              }
            />
          </div>
          {!isEditPaciente && index > 0 && (
            <button type="button" onClick={() => handleRemoveTelefone(index)}>
              Remover
            </button>
          )}
        </div>
      ))}
   {!isEditPaciente && (
      <button type="button" className="btn-add" onClick={handleAddTelefone}>
        Adicionar Novo Telefone
      </button>
   )}
    </div>
  );
};

export default TelefonePacForm;
