import React from "react";

interface Item {
  createdAt: string;
  showTime?: boolean; // Novo parâmetro opcional
}

const DataCriacao: React.FC<Item> = ({ createdAt, showTime = true }) => {
  if (!createdAt) return <div>Data não disponível</div>;

  // Configura o options de acordo com showTime
  const options: Intl.DateTimeFormatOptions = showTime
    ? {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/Sao_Paulo",
      }
    : {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "America/Sao_Paulo",
      };

  // Usa a localidade pt-BR e força timezone para America/Sao_Paulo
  const formattedDate = new Date(createdAt).toLocaleString("pt-BR", options);

  return <div>{formattedDate}</div>;
};

export default DataCriacao;
