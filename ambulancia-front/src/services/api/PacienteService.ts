import { API } from "../api";
import { Paciente } from "../../types/paciente/PacienteType";
import { TelefonePac } from "../../types/paciente/TelefonePacType";
import { EnderecoPac } from "../../types/paciente/EnderecoPacType";
import { AxiosResponse } from "axios";
export const fetchPacientes = (): Promise<AxiosResponse<Paciente[]>> => API.get('/paciente');
export const fetchPacienteById = (id: number) => API.get(`/paciente/${id}`);
export const createPaciente = (paciente: Paciente): Promise<AxiosResponse<Paciente>> => 
    API.post<Paciente>('/paciente', paciente);
export const updatePaciente = (id: number, paciente: Paciente) => API.put(`/paciente/${id}`, paciente);
export const deletePaciente = (id: number) => API.delete(`/paciente/${id}`);
export const reactivatePaciente = (id: number) => API.patch(`/paciente/reactivate/${id}`);


export const createManyTelPac = (id: number, list: TelefonePac[]): Promise<AxiosResponse<TelefonePac[]>> =>
    API.post(`/paciente/${id}/telefone`, list);
export const updateManyTelPac = (id: number, list: TelefonePac[]): Promise<AxiosResponse<TelefonePac[]>>  =>
    API.put(`/paciente/${id}/telefone`, list);
  
export const createManyEndPac = (id: number, list: EnderecoPac[]): Promise<AxiosResponse<EnderecoPac[]>> =>
    API.post(`/paciente/${id}/endereco`, list)
export const updateManyEndPac = (id: number, list: EnderecoPac[]): Promise<AxiosResponse<EnderecoPac[]>> =>
    API.put(`/paciente/${id}/endereco`, list);

