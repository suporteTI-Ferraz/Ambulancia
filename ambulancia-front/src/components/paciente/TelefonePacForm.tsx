import React, { useEffect, useState } from "react";
import { TelefonePac } from "../../types/paciente/TelefonePacType";

interface TelefoneFormProps {
  telefones: TelefonePac[]; // Adiciona a propriedade `telefones`
  onTelefonesChange: (telefones: TelefonePac[]) => void; // Callback para alterações
  isModal: Boolean; //Se for preciso no futuro, estiliza o botão de adicionar telefones inline se for modal

}


const TelefonePacForm: React.FC<TelefoneFormProps> = ({ onTelefonesChange, telefones }) => {
  const [localTelefones, setLocalTelefones] = useState<TelefonePac[]>(telefones);
  // Função para adicionar um novo telefone à lista
  useEffect(() => {
    if (telefones.length === 0) {
      const inicialTelefone = { id: 0, tipoTel: "", numTel: "", deletedAt: null };
      setLocalTelefones([inicialTelefone]);
      onTelefonesChange([inicialTelefone]);
    } else {
      setLocalTelefones(telefones);
    }
  }, [telefones, onTelefonesChange]);

  const handleAddTelefone = () => {
    const novoTelefone = { id: localTelefones.length, tipoTel: "", numTel: "", deletedAt: null };
    const updatedTelefones = [...localTelefones, novoTelefone];
    setLocalTelefones(updatedTelefones);
    onTelefonesChange(updatedTelefones);
  };


  // Função para atualizar um telefone na lista
  const handleTelefoneChange = (index: number, field: keyof TelefonePac, value: string) => {
    const updatedTelefones = localTelefones.map((telefone, i) =>
      i === index ? { ...telefone, [field]: value } : telefone
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
      {telefones.map((telefone, index) => (
        <div key={index} className="forms-sec-container">
          <div>
            <label>Tipo</label>
            <input
              type="text"
              placeholder="(EX: Celular, Fixo)"
              value={telefone.tipoTel}
              onChange={(e) =>
                handleTelefoneChange(index, "tipoTel", e.target.value)
              }
            />
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
          <button type="button" onClick={() => handleRemoveTelefone(index)}>
            Remover
          </button>
        </div>
      ))}

      <button type="button" className="btn-add" onClick={handleAddTelefone}>
        Adicionar Novo Telefone
      </button>
    </div>
  );
};


export default TelefonePacForm;
