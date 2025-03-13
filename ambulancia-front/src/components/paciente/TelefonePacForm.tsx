import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { TelefonePac } from "../../types/paciente/TelefonePacType";

interface TelefoneFormProps {
  onTelefonesChange: (telefones: TelefonePac[]) => void; // Callback para alterações
  resetTelefones?: boolean; // Flag para resetar telefones
  isModal: Boolean; // Se for preciso no futuro, estiliza o botão de adicionar telefones inline se for modal
  telefonesIniciais?: TelefonePac[];
}

const TelefonePacForm: React.FC<TelefoneFormProps> = ({
  onTelefonesChange,
  resetTelefones,
  telefonesIniciais = [],
}) => {
  const [localTelefones, setLocalTelefones] = useState<TelefonePac[]>([
    { id: 0, tipoTel: "CELULAR", numTel: "", deletedAt: null },
  ]);
  const [isEditPaciente, setIsEditPaciente] = useState<boolean>();

  useEffect(() => {
    // Inicializar com os telefones existentes, se houver
    if (telefonesIniciais.length > 0) {
      setLocalTelefones(telefonesIniciais);
      setIsEditPaciente(true);
    }
  }, [telefonesIniciais]);

  // Resetar telefones ao clicar em "Limpar"
  useEffect(() => {
    if (resetTelefones) {
      setLocalTelefones([{ id: 0, tipoTel: "CELULAR", numTel: "", deletedAt: null }]);
      onTelefonesChange([]);
    }
  }, [resetTelefones, onTelefonesChange]);

  // Função para adicionar um novo telefone à lista
  const handleAddTelefone = () => {
    const novoTelefone = { id: localTelefones.length, tipoTel: "CELULAR", numTel: "", deletedAt: null };
    const updatedTelefones = [...localTelefones, novoTelefone];
    setLocalTelefones(updatedTelefones);
    onTelefonesChange(updatedTelefones);
  };

  // Função para atualizar um telefone na lista
  const handleTelefoneChange = (index: number, field: keyof TelefonePac, value: string) => {
    const updatedTelefones = localTelefones.map((telefone, i) => {
      if (i === index) {
        let updatedTelefone = { ...telefone, [field]: value };

        // Se o tipo for alterado para CELULAR, insira automaticamente o "9" no número,
        // caso o número atual contenha 8 dígitos (desconsiderando a formatação).
        if (field === "tipoTel" && value === "CELULAR") {
          const rawNum = telefone.numTel.replace(/\D/g, "");
          // Se houver exatamente 8 dígitos, insere o 9 após os dois primeiros (código de área)
          if (rawNum.length === 8) {
            updatedTelefone.numTel = rawNum.slice(0, 2) + "9" + rawNum.slice(2);
          }
        }
        return updatedTelefone;
      }
      return telefone;
    });
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
      {localTelefones.map((telefone, index) => {
        // Define a máscara com base no tipo de telefone
        const mask = telefone.tipoTel === "CELULAR" ? "(99) \\99999-9999" : "(99) 9999-9999";

        return (
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
              <InputMask
                mask={mask}
                value={telefone.numTel}
                onChange={(e) => handleTelefoneChange(index, "numTel", e.target.value)}
              >
                {(inputProps: any) => <input {...inputProps} type="text" />}
              </InputMask>
            </div>
            {!isEditPaciente && index > 0 && (
              <button type="button" onClick={() => handleRemoveTelefone(index)}>
                Remover
              </button>
            )}
          </div>
        );
      })}
      {!isEditPaciente && (
        <button type="button" className="btn-add" onClick={handleAddTelefone}>
          Adicionar Novo Telefone
        </button>
      )}
    </div>
  );
};

export default TelefonePacForm;
