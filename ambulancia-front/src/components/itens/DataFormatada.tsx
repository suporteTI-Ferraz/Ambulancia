import React from "react";

interface Item {
  createdAt: string;
}

const DataCriacao: React.FC<Item> = ({ createdAt }) => {
  // Cria uma instância do Intl.DateTimeFormat para formatar a data em pt-BR
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(createdAt));

  return (
    <div>
      {formattedDate}
    </div>
  );
};

export default DataCriacao;
