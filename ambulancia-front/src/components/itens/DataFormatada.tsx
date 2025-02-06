import React from "react";

interface Item {
  createdAt: string;
  showTime?: boolean; // Novo parâmetro opcional
}

const DataCriacao: React.FC<Item> = ({ createdAt, showTime = true }) => {
  if (!createdAt) return <div>Data não disponível</div>;

  const options: Intl.DateTimeFormatOptions = showTime
    ? { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }
    : { year: "numeric", month: "numeric", day: "numeric" };

  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(new Date(createdAt));

  return <div>{formattedDate}</div>;
};

export default DataCriacao;