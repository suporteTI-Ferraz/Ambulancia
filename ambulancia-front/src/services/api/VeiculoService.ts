import { API } from "../api";
import { Veiculo } from "../../types/veiculo/VeiculoType";
import Manutencao from "../../types/veiculo/ManutencaoType";
import { AxiosResponse } from "axios";


export const fetchVeiculos = (): Promise<AxiosResponse<Veiculo[]>> => API.get('/veiculo');
export const fetchVeiculoById = (id: number) => API.get(`/veiculo/${id}`);
export const createVeiculo = (veiculo: Veiculo): Promise<AxiosResponse<Veiculo>> => 
    API.post<Veiculo>('/veiculo', veiculo);
export const updateVeiculo = (id: number, veiculo: Veiculo) => API.put(`/veiculo/${id}`, veiculo);
export const deleteVeiculo = (id: number) => API.delete(`/veiculo/${id}`);
export const reactivateVeiculo = (id: number) => API.patch(`/veiculo/reactivate/${id}`);


export const createManyManu = (id: number, list: Manutencao[]): Promise<AxiosResponse<Manutencao[]>> =>
    API.post(`/veiculo/${id}/manutencao`, list);
export const updateManyManu = (id: number, list: Manutencao[]): Promise<AxiosResponse<Manutencao[]>>  =>
    API.put(`/veiculo/${id}/manutencao`, list);
  