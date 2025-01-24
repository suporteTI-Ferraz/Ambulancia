import { API, CorreiosAPI } from "./api";
import { Paciente } from "../types/paciente/PacienteType";
import { TelefonePac } from "../types/paciente/TelefonePacType";
import { EnderecoPac } from "../types/paciente/EnderecoPacType";
export const fetchPacientes = () => API.get('/paciente');
export const fetchPacienteById = (id: number) => API.get(`/paciente/${id}`);
export const createPaciente = (paciente: Paciente) => API.post('/paciente', paciente);
export const updatePaciente = (id: number, paciente: Paciente) => API.put(`/paciente/${id}`, paciente);
export const deletePaciente = (id: number) => API.delete(`/paciente/${id}`);
export const reactivatePaciente = (id: number) => API.post(`/paciente/reactivate/${id}`);


export const createManyTelPac = (id: number, list: TelefonePac[]) =>
    API.post(`/paciente/${id}/telefone`, list);
export const updateManyTelPac = (id: number, list: TelefonePac[]) =>
    API.put(`/paciente/${id}/telefone`, list);
  
export const createManyEndPac = (id: number, list: EnderecoPac[]) =>
    API.post(`/paciente/${id}/endereco`, list)
export const updateManyEndPac = (id: number, list: EnderecoPac[]) =>
    API.put(`/paciente/${id}/endereco`, list);

export const buscaCep = async (cep: string) => {
    try {
      // Remove caracteres não numéricos do CEP
      const cepLimpo = cep.replace(/\D/g, "");
      // Verifica se o CEP possui 8 dígitos
      if (cepLimpo.length !== 8) {
        throw new Error("CEP inválido. Deve conter 8 dígitos.");
      }
  
      const response = await CorreiosAPI.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      if (response.data.erro) {
        throw new Error("CEP não encontrado.");
      }
  
      return {
        ruaPac: response.data.logradouro || "",
        bairroPac: response.data.bairro || "",
        cidadePac: response.data.localidade || "",
        estadoPac: response.data.uf || "",
      };
    } catch (error: any) {
      console.error("Erro ao buscar o CEP:", error.message || error);
      throw new Error(error.message || "Erro ao buscar o CEP.");
    }
  };