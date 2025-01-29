import { API } from "../api";
import { Hospital } from "../../types/hospital/HospitalType";
import { EnderecoHosp } from "../../types/hospital/EnderecoHospType";
import { AxiosResponse } from "axios";
export const fetchHospitais = (): Promise<AxiosResponse<Hospital[]>> => API.get('/hospital');
export const fetchHospitalById = (id: number) => API.get(`/hospital/${id}`);
export const createHospital = (Hospital: Hospital): Promise<AxiosResponse<Hospital>> => 
    API.post<Hospital>('/hospital', Hospital);
export const updateHospital = (id: number, Hospital: Hospital) => API.put(`/hospital/${id}`, Hospital);
export const deleteHospital = (id: number) => API.delete(`/hospital/${id}`);
export const reactivateHospital = (id: number) => API.patch(`/hospital/reactivate/${id}`);


  
export const createManyEndHosp = (id: number, list: EnderecoHosp[]): Promise<AxiosResponse<EnderecoHosp[]>> =>
    API.post(`/hospital/${id}/endereco`, list)
export const updateManyEndHosp = (id: number, list: EnderecoHosp[]): Promise<AxiosResponse<EnderecoHosp[]>> =>
    API.put(`/hospital/${id}/endereco`, list);

