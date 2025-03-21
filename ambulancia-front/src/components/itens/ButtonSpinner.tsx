import React from "react";
import { Spinner } from 'reactstrap'; // Importando o Spinner do Bootstrap

interface ButtonSpinnerProps {
    classe: string;
    name: string;
    isLoading: boolean;
    onClick?: (e?: React.FormEvent) => void;
    type?: "button" | "submit"; // Permitir customizar o tipo do botão
  }
  const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({
    classe,
    name,
    isLoading,
    onClick,
    type = "button", // Por padrão está definido como "button"
  }) => {
    return (
      <button
        className={classe}
        type={type}
        disabled={isLoading}
        onClick={(e) => onClick && onClick(e)} // Passa o evento se necessário
      >
        {isLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          name
        )}
      </button>
    );
  };

export default ButtonSpinner;
