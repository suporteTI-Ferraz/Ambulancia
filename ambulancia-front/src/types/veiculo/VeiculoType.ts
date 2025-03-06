import Manutencao from "./ManutencaoType";

export interface Veiculo {
    id: number;
    placaVeic: string;
    modeloVeic: string;
    marcaVeic: string;
    anoFabricacao: string;
    chassi: string;
    quilometragemAtual: number;
    classe: string;
    manutencoes: Manutencao[] | [];
    deletedAt: string | null; // null se não está deletado, data se está deletado
    createdAt: string;
    
}