import { API } from "./api";
import { User } from "../types/user/UserType";
export const fetchUsers = () => API.get('/user');
export const fetchUserById = (id: number) => API.get(`/user${id}`);
export const createUser = (user: User) => API.post('/auth/register', user);
export const updateUser = (id: number, user: User) => API.put(`/user/${id}`, user);
export const deleteUser = (id: number) => API.delete(`/user/${id}`);
export const reactivateUser = (id: number) => API.post(`/user/${id}`);