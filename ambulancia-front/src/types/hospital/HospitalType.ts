import { EnderecoHosp } from "./EnderecoHospType";

export interface Hospital{
    id: number;
    nomeHosp: string;
    enderecos: EnderecoHosp[] | []; //Se não tiver endereco, será um array vazio
    deletedAt: string | null; // null se não está deletado, data se está deletado
    createdAt: string;
}