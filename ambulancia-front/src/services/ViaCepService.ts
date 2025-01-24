import { CorreiosAPI } from "./api";
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