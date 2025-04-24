/**
 * ManutencaoType.ts - TypeScript interface for manutenção data
 * Synced with Manutencao.java and ManutencaoDTO.java fields.
 */
import { Veiculo } from "./VeiculoType";
import { Fornecedor } from "./FornecedorType";

// Assuming StatusManutencao is an enum type: "PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"
export type StatusManutencao = "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";

export default interface Manutencao {
  id: number;
  dataEntradaManutencao: string;
  dataSaidaManutencao: string;
  status: StatusManutencao;
  tipoManutencao: string;
  descricaoProblema: string;
  servicoRealizado: string;
  custoMaoObra: number;    // added (maps to custoMaoObra)
  custoPecas: number;      // added (maps to custoPecas)
  deletedAt: string | null;
  createdAt: string;
  veiculo: Veiculo | null;    // relationship
  fornecedor: Fornecedor | null;  // relationship
}