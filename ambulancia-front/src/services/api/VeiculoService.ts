import { API } from "../api";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import Manutencao from "../../types/veiculo/ManutencaoType";
import { AxiosResponse } from "axios";
import { Fornecedor } from "../../types/veiculo/FornecedorType";
import PecaManutencao from "../../types/veiculo/PecaManutencaoType";


export const fetchVeiculos = (): Promise<AxiosResponse<Veiculo[]>> => API.get('/veiculo');
export const fetchVeiculoById = (id: number) => API.get(`/veiculo/${id}`);
export const createVeiculo = (veiculo: Veiculo): Promise<AxiosResponse<Veiculo>> => 
    API.post<Veiculo>('/veiculo', veiculo);
export const updateVeiculo = (id: number, veiculo: Veiculo) => API.put(`/veiculo/${id}`, veiculo);
export const deleteVeiculo = (id: number) => API.delete(`/veiculo/${id}`);
export const reactivateVeiculo = (id: number) => API.patch(`/veiculo/reactivate/${id}`);


export const fetchFornecedores = (): Promise<AxiosResponse<Fornecedor[]>> => API.get('/fornecedor');
export const createFornecedor = (fornecedor: Fornecedor): Promise<AxiosResponse<Fornecedor>> =>
    API.post<Fornecedor>('/fornecedor', fornecedor);
export const updateFornecedor = (id: number, fornecedor: Fornecedor) => API.put(`/fornecedor/${id}`, fornecedor);
export const deleteFornecedor = (id: number) => API.delete(`/fornecedor/${id}`);
export const reactivateFornecedor = (id: number) => API.patch(`/fornecedor/reactivate/${id}`);

export const fetchPecaManutencoes = (): Promise<AxiosResponse<PecaManutencao[]>> => API.get('/manutencao/peca');
export const createPecaManutencao = (pecaManutencao: PecaManutencao, id: number): Promise<AxiosResponse<PecaManutencao>> =>
    API.post<PecaManutencao>(`/manutencao/${id}/peca`, pecaManutencao);


export const createManu = (idVeic: number, idForn: number, manutencao: Manutencao): Promise<AxiosResponse<Manutencao>> =>
    API.post(`/veiculo/${idVeic}/fornecedor/${idForn}/manutencao`, manutencao);
export const updateManyManu = (id: number, list: Manutencao[]): Promise<AxiosResponse<Manutencao[]>>  =>
    API.put(`/veiculo/${id}/manutencao`, list);
  