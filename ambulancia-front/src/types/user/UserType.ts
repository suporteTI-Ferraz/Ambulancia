export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  role: string;
  deletedAt: string | null; // null se não está deletado, data se está deletado
  createdAt: string;
}

  