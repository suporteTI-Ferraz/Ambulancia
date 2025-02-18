import axios from "axios";

const API_URL = 'http://localhost:8080/api';
const token = ''; //O TOKEN PRECISA SER RECUPERADO DE ALGUMA FORMA, PODE SER PELO react-native-async-storage
const ViaCepAPI = "https://viacep.com.br/ws/";

export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`, // Passando o token no cabeçalho
      'Content-Type': 'application/json',
    },
  });

export const CorreiosAPI = axios.create({
  baseURL: ViaCepAPI
})