import Manutencao from "./ManutencaoType";

export interface Fornecedor{
    id: number;
    nome: string;
    cnpj: string;
    telefone: string;
    deletedAt: string | null;
    createdAt: string;
    manutencoes: Manutencao[] | [];
    
}