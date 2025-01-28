import { API } from "../api";
import { Motorista } from "../../types/motorista/MotoristaType";
import { AxiosResponse } from "axios";


export const fetchMotoristas = (): Promise<AxiosResponse<Motorista[]>>  => 
    API.get('/motorista');
export const fetchMotoristaById = (id: number): Promise<AxiosResponse<Motorista>>  => 
    API.get(`/motorista/${id}`);
export const createMotorista = (motorista: Motorista): Promise<AxiosResponse<Motorista>>  => 
    API.post('/motorista', motorista);
export const updateMotorista = (id: number, Motorista: Motorista): Promise<AxiosResponse<Motorista>> => 
    API.put(`/motorista/${id}`, Motorista);
export const deleteMotorista = (id: number) => API.delete(`/motorista/${id}`);
export const reactivateMotorista = (id: number) => API.patch(`/motorista/reactivate/${id}`);