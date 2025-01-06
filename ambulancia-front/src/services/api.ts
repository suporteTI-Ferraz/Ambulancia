import axios from "axios";

const API_URL = 'http://localhost:8080/api';

export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });