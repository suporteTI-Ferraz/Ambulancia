export default interface PecaManutencao{
    id: number;
    nomePeca: string;
    quantidade: number;
    custoUnitario: number;
    deletedAt: string | null;
    createdAt: string;
}