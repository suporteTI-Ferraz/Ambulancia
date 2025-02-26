export default interface Manutencao{
    id: number | null;
    tipoManutencao: string;
    dataManutencao: string;
    custoManutencao: number;
    status: string;
    descricaoProblema: string;
    servicoRealizado: string;
    deletedAt: string | null;
}