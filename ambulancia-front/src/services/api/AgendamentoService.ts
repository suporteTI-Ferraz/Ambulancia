import { AxiosResponse } from "axios";
import { Agendamento, CreateAgendamentoDTO, EditAgendamentoDTO } from "../../types/agenda/Agendamento";
import { Agenda } from "../../types/agenda/Agenda";
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



//AgendaService
export const fetchAgenda = (): Promise<AxiosResponse<Agenda[]>>  => 
    API.get('/agenda');
export const fetchAgendaById = (id: number): Promise<AxiosResponse<Agenda>>  => 
    API.get(`/agenda/${id}`);
export const createAgenda = (agenda: Agenda): Promise<AxiosResponse<Agenda>>  => 
    API.post('/agenda', agenda);
export const updateAgenda = (id: number, agenda: Agenda): Promise<AxiosResponse<Agenda>> => 
    API.put(`/user/${id}`, agenda);
