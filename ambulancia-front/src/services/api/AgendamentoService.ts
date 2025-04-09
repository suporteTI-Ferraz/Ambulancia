import { AxiosResponse } from "axios";
import { Agendamento, CreateAgendamentoDTO, EditAgendamentoDTO } from "../../types/agenda/Agendamento";
import { API } from "../api";

//AgendamentoService
export const fetchAgendamento = (): Promise<AxiosResponse<Agendamento[]>>  => 
    API.get('/agendamento');
export const createAgendamento = (agendamento: CreateAgendamentoDTO): Promise<AxiosResponse<Agendamento>>  => 
    API.post('/agendamento', agendamento);
export const updateAgendamento = (id: number, agendamento: EditAgendamentoDTO): Promise<AxiosResponse<Agendamento>>  => 
    API.put(`/agendamento/${id}`, agendamento);
export const finalizarAgendamento = (id: number, quilometragemFinal: number): Promise<AxiosResponse<Agendamento>>  => 
    API.put(`/agendamento/finalizar/${id}`, quilometragemFinal);