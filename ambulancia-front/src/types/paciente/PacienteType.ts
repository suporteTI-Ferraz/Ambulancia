import { EnderecoPac } from "./EnderecoPacType";
import { TelefonePac } from "./TelefonePacType";
export interface Paciente{
    id: number;
    nomePaciente: string;
    cpf: string;
    sus: string;
    condicoesEspecificas: string;
    enderecos: EnderecoPac[] | []; //Se não tiver endereco, será um array vazio
    telefones: TelefonePac[] | [];
    deletedAt: string | null; // null se não está deletado, data se está deletado
    createdAt: string;
}