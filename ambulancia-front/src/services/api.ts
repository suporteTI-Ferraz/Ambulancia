import axios from "axios";

const API_URL = 'http://localhost:8080/api';
const ViaCepAPI = "https://viacep.com.br/ws/";

export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const CorreiosAPI = axios.create({
  baseURL: ViaCepAPI
})