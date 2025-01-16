import React, { useState } from "react";
import CustomModal from "./CustomModal";
import { TelefonePac } from "../../types/paciente/TelefonePacType";

interface TelefoneModalProps {
  telefones: TelefonePac[];
  isOpen: boolean;
  toggle: () => void;
}

const TelefoneModal: React.FC<TelefoneModalProps> = ({ telefones, isOpen, toggle }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      toggle={toggle}
      title="Telefones do Paciente"
      cancelText="Fechar"
    >
      {telefones.length > 0 ? (
        <ul>
          {telefones.map((telefone, index) => (
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
