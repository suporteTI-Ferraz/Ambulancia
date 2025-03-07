import { Fornecedor } from "./FornecedorType";
import { Veiculo } from "./VeiculoType";

export default interface Manutencao{
    id: number;
    tipoManutencao: string;
    dataManutencao: string;
    custoManutencao: number;
    status: string;
    descricaoProblema: string;
    servicoRealizado: string;
    veiculo: Veiculo | null;
    fornecedor: Fornecedor | null;
    deletedAt: string | null;
    createdAt: string;
}