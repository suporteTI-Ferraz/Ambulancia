import { useState } from "react";
import { toast } from "react-toastify";

export const useToast = () => {
  const [loading, setLoading] = useState(false);

  const handleError = (message: string) => {
    toast.error(message); // Exibe notificação de erro
  };

  const handleSuccess = (message: string) => {
    toast.success(message); // Exibe notificação de sucesso
  };

  const handleLoad = (message: string): number => {
    const toastId = toast.loading(message); // Exibe a notificação de carregamento
    return toastId as number; // Força o tipo de toastId para number
  };

  const dismissLoading = (toastId: number) => {
    toast.dismiss(toastId); // Remove o toast de carregamento usando o ID
  };

  return { handleError, handleSuccess, handleLoad, loading, setLoading, dismissLoading };
};
