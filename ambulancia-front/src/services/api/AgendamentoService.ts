import { AxiosResponse } from "axios";
import { Agendamento, CreateAgendamentoDTO } from "../../types/agenda/Agendamento";
import { Agenda } from "../../types/agenda/Agenda";
import { API } from "../api";

export const fetchAgendamento = (): Promise<AxiosResponse<Agendamento[]>>  => 
    API.get('/agendamento');
export const createAgendamento = (agendamento: CreateAgendamentoDTO): Promise<AxiosResponse<Agendamento>>  => 
    API.post('/agendamento', agendamento);

export const fetchAgenda = (): Promise<AxiosResponse<Agenda[]>>  => 
    API.get('/agenda');
export const fetchAgendaById = (id: number): Promise<AxiosResponse<Agenda>>  => 
    API.get(`/agenda/${id}`);
export const createAgenda = (agenda: Agenda): Promise<AxiosResponse<Agenda>>  => 
    API.post('/agenda', agenda);
export const updateAgenda = (id: number, agenda: Agenda): Promise<AxiosResponse<Agenda>> => 
    API.put(`/user/${id}`, agenda);
