import { useState } from "react";
import { useToast } from "./useToast";
import { login } from "../services/api/UserService";

export const useLogin = () => {
      const [email, setEmail] = useState("");
      const [senha, setSenha] = useState("");
        const { handleError, handleSuccess } = useToast();

        const handleLogin = async (): Promise<boolean> => {
            try {
              const response = await login(email, senha);
        
              if (response.status === 200) {
                console.log("Login bem-sucedido");
                // checkLoginStatus(); // Atualiza o estado de autenticação no contexto
                // navigate("/dashboard", { replace: true }); // Redireciona para a rota protegida
                handleSuccess("Logado com sucesso!");
                return true;
                //await handleRedirect()
              } else {
                console.error("Login falhou");
                handleError("Login falhou");  // Melhor adicionar a mensagem de erro
  
                return false;
              }
            } catch (error) {
              console.error("Erro ao fazer login:", error);
              handleError("Erro ao fazer Login: " + error);  // Melhor adicionar a mensagem de erro
              return false;
            }
          };

          return{
            email,
            senha,
            handleLogin,
            setEmail,
            setSenha,
        };
      
}

export default useLogin;