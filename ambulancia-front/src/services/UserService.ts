import { API } from "./api";
import { UserType } from "../types/UserType";
export const fetchUsers = () => API.get('/user');
export const fetchUserById = (id: number) => API.get(`/user${id}`);
export const createUser = (user: UserType) => API.post('/auth/register', user);
export const updateUser = (id: number, user: UserType) => API.put(`/user/${id}`, user);
export const deleteUser = (id: number) => API.delete(`/user/${id}`);
export const reactivateUser = (id: number) => API.post(`/user/${id}`);