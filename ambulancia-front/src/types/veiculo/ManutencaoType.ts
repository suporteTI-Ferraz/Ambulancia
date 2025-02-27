export default interface Manutencao{
    id: number;
    tipoManutencao: string;
    dataManutencao: string;
    custoManutencao: number;
    status: string;
    descricaoProblema: string;
    servicoRealizado: string;
    deletedAt: string | null;
    createdAt: string;
}