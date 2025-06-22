import axios from "axios";

// rotas para o back end
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

// vereficando o token existe e fazendo a autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface NewUserData {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export const createUser = async (data: NewUserData) => {
  const response = await api.post("/users", data);
  return response.data;
};

export default api;

export interface Servico {
  id: number;
  name: string;
  preco: string;
  descricao: string;
}

// Cortes
export const getCortes = async (): Promise<Servico[]> => {
  const response = await api.get("/cortes");
  return response.data;
};

// Barbas
export const getBarbas = async (): Promise<Servico[]> => {
  const response = await api.get("/barba");
  return response.data;
};
