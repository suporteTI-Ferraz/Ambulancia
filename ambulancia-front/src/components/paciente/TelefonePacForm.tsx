import React, { useState } from "react";
import { TelefonePac } from "../../types/paciente/TelefonePacType";

interface TelefoneFormProps {
  telefones: TelefonePac[]; // Adiciona a propriedade `telefones`
  onTelefonesChange: (telefones: TelefonePac[]) => void; // Callback para alterações
}


const TelefonePacForm: React.FC<TelefoneFormProps> = ({ onTelefonesChange }) => {
  const [telefones, setTelefones] = useState<TelefonePac[]>([
    { id: 0, tipoTel: "", numTel: "", deletedAt: null },
  ]);

  // Função para adicionar um novo telefone à lista
  const handleAddTelefone = () => {
    setTelefones([
      ...telefones,
      { id: telefones.length, tipoTel: "", numTel: "", deletedAt: null },
    ]);
  };

  // Função para atualizar um telefone na lista
  const handleTelefoneChange = (index: number, field: keyof TelefonePac, value: string) => {
    const updatedTelefones = telefones.map((telefone, i) =>
      i === index ? { ...telefone, [field]: value } : telefone
    );
    setTelefones(updatedTelefones);
    onTelefonesChange(updatedTelefones);
  };

  // Função para remover um telefone da lista
  const handleRemoveTelefone = (index: number) => {
    const updatedTelefones = telefones.filter((_, i) => i !== index);
    setTelefones(updatedTelefones);
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
