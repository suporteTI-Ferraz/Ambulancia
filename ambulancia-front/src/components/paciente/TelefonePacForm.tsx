import React, { useState } from "react";
import { TelefonePac } from "../../types/paciente/TelefonePacType";

interface TelefoneFormProps {
  onTelefonesChange: (telefones: TelefonePac[]) => void;
  isModal: boolean;
}

const TelefonePacForm: React.FC<TelefoneFormProps> = ({ onTelefonesChange, isModal }) => {
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

  const handleSubmit = () => {
  const isValid = telefones.every(
    (telefone) => telefone.tipoTel.trim() !== "" && telefone.numTel.trim() !== ""
  );

  if (!isValid) {
    alert("Todos os campos devem ser preenchidos antes de salvar!");
    return;
  }

  onTelefonesChange(telefones);
};


  return (
    <div>
      <h4>Telefones</h4>
      {telefones.map((telefone, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Tipo (ex: Celular)"
            value={telefone.tipoTel}
            onChange={(e) => handleTelefoneChange(index, "tipoTel", e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="Número"
            value={telefone.numTel}
            onChange={(e) => handleTelefoneChange(index, "numTel", e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button type="button" onClick={() => handleRemoveTelefone(index)}>
            Remover
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddTelefone}>
        Adicionar Telefone
      </button>
      {isModal &&       <button className='edit' type="submit">Salvar</button>    }
    </div>
  );
};

export default TelefonePacForm;
