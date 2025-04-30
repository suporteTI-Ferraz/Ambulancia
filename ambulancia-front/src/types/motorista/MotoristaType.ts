export interface Motorista {
    id: number;
    nomeMotorista: string;
    telefone: string;
    deletedAt: string | null; // null se não está deletado, data se está deletado
    createdAt: string;
  }
  
    