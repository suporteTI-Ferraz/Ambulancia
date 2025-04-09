import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useToast } from "../hooks/useToast";
import useLogin from "../hooks/useLogin";
import '../styles/global.css';
import "../styles/Login.css";

const Login = () => {
  const { email, senha, setEmail, setSenha, handleLogin } = useLogin();
  const navigate = useNavigate();
  const { checkLoginStatus } = useAuth();
  const { loading, setLoading } = useLoading();
  const { handleLoad, dismissLoading } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const toastKey = handleLoad("Carregando...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = handleLogin();
      if (await result) {
        checkLoginStatus();
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
    } finally {
      setLoading(false);
      dismissLoading(toastKey);
    }
  };

  return (
    <>
      <div className="login-container">

        {/* Background */}
        <div className="bg-image-login"></div>
        <div className="div-secundaria-login">

        {/* Container principal para o conteúdo */}
        <div className="login-content">

          {/* Formulário de login */}
          <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className="form-group-login">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="text"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group-login">
                <label htmlFor="senha">Senha</label>
                <input
                  id="senha"
                  type="password"
                  placeholder="●●●●●●●"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <button className="login-button">
                Login
              </button>
            </form>

          </div>

            {/* Seção de saudação explicativa */}
            <div className="login-info">
              <div className="div-imgs-login">
                <img className="img-login-fatec" src="/assets/fatec-ferraz.png" alt="" />
                <img className="img-login-prefeitura" src="/assets/logo_horizontal-sem-fundo.png" alt="" />
              </div>
              <h2>Bem-vindo ao Gamun!</h2>
              <p>
              O Gamun - Gerenciador de Ambulâncias Municipais, ajuda a organizar o trabalho das ambulâncias municipais, facilitando o acompanhamento dos chamados, atendimentos e manutenção, para um serviço mais rápido e eficiente para a população!</p>
              <p>Entre com sua conta para começar!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
