import Manutencao from "./ManutencaoType";

export interface Veiculo {
    id: number;
    placaVeic: string;
    quilometragem: number;
    classe: string;
    manutencoes: Manutencao[] | [];
    deletedAt: string | null; // null se não está deletado, data se está deletado
    createdAt: string;
}