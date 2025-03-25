import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import InputMask from "react-input-mask";
import { TelefonePac } from "../../types/paciente/TelefonePacType";
import '../../styles/TelefonePacForm.css'

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
    <div className="form-container-telefone">
      <h4 className="titulo-form-telefone">Telefones</h4>
      {localTelefones.map((telefone, index) => {
        const mask = telefone.tipoTel === "CELULAR" ? "(99) \\99999-9999" : "(99) 9999-9999";
        return (
          <div key={index} className="container-inputs-telefone">
          <div key={index}>
            <Form.Group controlId={`telefone-tipo-${index}`} className="input-telefone">
              <Form.Label>Tipo</Form.Label>
              <Form.Control 
                as="select" 
                value={telefone.tipoTel} 
                onChange={(e) => handleTelefoneChange(index, "tipoTel", e.target.value)}
              >
                <option value="CELULAR">Celular</option>
                <option value="FIXO">Fixo</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId={`telefone-numero-${index}`} className="input-telefone">
              <Form.Label>Número</Form.Label>
              <InputMask
                mask={mask}
                value={telefone.numTel}
                onChange={(e) => handleTelefoneChange(index, "numTel", e.target.value)}
              >
                {(inputProps: any) => <Form.Control {...inputProps} type="text" />}
              </InputMask>
            </Form.Group>
            {!isEditPaciente && index > 0 && (
              <Button className="btn-rmv-telefone" type="button" onClick={() => handleRemoveTelefone(index)}>
                Remover
              </Button>
            )}
          </div>
          </div>
        );
      })}
      {!isEditPaciente && (
        <Button className="btn-add-telefone" type="button" onClick={handleAddTelefone}>
          Adicionar novo telefone
        </Button>
      )}
    </div>
  );
};

export default TelefonePacForm;
