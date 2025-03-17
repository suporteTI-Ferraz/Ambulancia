import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useToast } from "../hooks/useToast";
import useLogin from "../hooks/useLogin";
import '../styles/global.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <>
    <Header />
    <div className="login-container">
      
      {/* Background */}
      <div className="bg-image-login"></div>

      {/* Formulário de Login */}
      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Bem vindo!</h1>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="●●●●●●●"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button border-2">
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
