import { API } from "./api";
import { Paciente } from "../types/paciente/PacienteType";
import { TelefonePac } from "../types/paciente/TelefonePacType";
import { EnderecoPac } from "../types/paciente/EnderecoPacType";
export const fetchPacientes = () => API.get('/paciente');
export const fetchPacienteById = (id: number) => API.get(`/paciente/${id}`);
export const createPaciente = (paciente: Paciente) => API.post('/paciente', paciente);
export const updatePaciente = (id: number, paciente: Paciente) => API.put(`/paciente/${id}`, paciente);
export const deletePaciente = (id: number) => API.delete(`/paciente/${id}`);
export const reactivatePaciente = (id: number) => API.post(`/paciente/reactivate/${id}`);


export const createManyTelPac = (id: number, list: TelefonePac[]) =>
    API.post(`/paciente/${id}/telefone`, list);
  
export const createManyEndPac = (id: number, list: EnderecoPac[]) =>
    API.post(`/paciente/${id}/endereco`, list)