import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useToast } from "../hooks/useToast";
import useLogin from "../hooks/useLogin";

const Login = () => {
    const {
      email,
      senha,
      setEmail,
      setSenha,
      handleLogin,
    } = useLogin()
  
 
  const navigate = useNavigate();
  const { checkLoginStatus } = useAuth(); // Use apenas aqui, fora de funções assíncronas
    const { loading, setLoading } = useLoading(); // Acessa o loading globalmente
    const { handleLoad, dismissLoading } = useToast(); 
     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return; // Impede múltiplos envios enquanto está carregando
        setLoading(true); // Bloqueia enquanto a requisição está em andamento
        const toastKey = handleLoad("Carregando...");
    
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));  //Para testar o spinner
          const result = handleLogin(); // Chama a função onSave (criação ou edição)
          if(await result){
            checkLoginStatus(); // Atualiza o estado de autenticação no contexto
            navigate("/dashboard", { replace: true }); // Redireciona para a rota protegida
          }
        } catch (error) {
          console.error("Erro ao salvar paciente:", error);
        } finally {
          setLoading(false); // Libera o botão após a requisição terminar
          dismissLoading(toastKey);
        }
      };

  

  return (
    <div className="login-container">
      
      {/* Background */}
      <div
        className="background-image"
        style={{ backgroundImage: `url('/assets/ferraz-predio-imagem.jpeg')` }}
        ></div>

      {/* Formulário de Login */}
      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Faça o login</h1>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p>
          Não tem uma conta?{" "}
          <a href="/cadastro" className="signup-link">
            Cadastre-se aqui
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
