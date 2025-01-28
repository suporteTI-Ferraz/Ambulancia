import { API } from "../api";
import { User } from "../../types/user/UserType";
import { AxiosResponse } from "axios";

export const fetchUsers = (): Promise<AxiosResponse<User[]>>  => 
    API.get('/user');
export const fetchUserById = (id: number): Promise<AxiosResponse<User>>  => 
    API.get(`/user/${id}`);
export const createUser = (user: User): Promise<AxiosResponse<User>>  => 
    API.post('/auth/register', user);
export const updateUser = (id: number, user: User): Promise<AxiosResponse<User>> => 
    API.put(`/user/${id}`, user);
export const deleteUser = (id: number) => API.delete(`/user/${id}`);
export const reactivateUser = (id: number) => API.patch(`/user/reactivate/${id}`);