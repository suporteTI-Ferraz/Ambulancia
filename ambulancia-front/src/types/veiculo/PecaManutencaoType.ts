export default interface PecaManutencao{
    id: number | null;
    nomePeca: string;
    quantidade: number;
    custoUnitario: number;
    deletedAt: string | null;
}