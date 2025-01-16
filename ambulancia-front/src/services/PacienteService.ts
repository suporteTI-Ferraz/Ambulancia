import { API } from "./api";
import { Paciente } from "../types/paciente/PacienteType";
export const fetchPacientes = () => API.get('/paciente');
export const fetchPacienteById = (id: number) => API.get(`/paciente/${id}`);
export const createPaciente = (paciente: Paciente) => API.post('/paciente', paciente);
export const updatePaciente = (id: number, paciente: Paciente) => API.put(`/paciente/${id}`, paciente);
export const deletePaciente = (id: number) => API.delete(`/paciente/${id}`);
export const reactivatePaciente = (id: number) => API.post(`/paciente/${id}`);