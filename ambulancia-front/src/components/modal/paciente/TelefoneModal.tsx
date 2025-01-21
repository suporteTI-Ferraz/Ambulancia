import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { TelefonePac } from "../../../types/paciente/TelefonePacType";
import TelefonePacForm from "../../paciente/TelefonePacForm";

interface TelefoneModalProps {
  telefones: TelefonePac[]; // Deve ser um array de objetos do tipo TelefonePac
  isOpen: boolean;          // Define se o modal está aberto
  toggle: () => void;       // Função para alternar o estado do modal
  onTelefonesChange: (telefones: TelefonePac[]) => void; // Callback para mudanças
}



const TelefoneModal: React.FC<TelefoneModalProps> = ({
  telefones,
  isOpen,
  toggle,
  onTelefonesChange,
}) => {
  const [currentTelefones, setCurrentTelefones] = useState<TelefonePac[]>([]);

  useEffect(() => {
    setCurrentTelefones(telefones);
  }, [telefones]);
  

  const handleSave = () => {
    const isValid = currentTelefones.every(
      (telefone) => telefone.tipoTel.trim() !== "" && telefone.numTel.trim() !== ""
    );

    if (!isValid) {
      alert("Todos os campos devem ser preenchidos antes de salvar!");
      return;
    }

    onTelefonesChange(currentTelefones); // Atualiza os telefones no componente pai
    toggle();
  };

  return (
    <CustomModal isOpen={isOpen} toggle={toggle} title="Telefones do Paciente" cancelText="Fechar">
      <TelefonePacForm
        telefones={currentTelefones}
        onTelefonesChange={setCurrentTelefones}
        isModal={true}
      />
      <button onClick={handleSave}>Salvar</button>
      {currentTelefones.length > 0 ? (
        <ul>
          {currentTelefones.map((telefone, index) => (
            <li key={index}>
              Tipo: {telefone.tipoTel}, Número: {telefone.numTel}
            </li>
          ))}
        </ul>
      ) : (
        <p>Este paciente não possui telefones cadastrados.</p>
      )}
    </CustomModal>
  );
};


export default TelefoneModal;
