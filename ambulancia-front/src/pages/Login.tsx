import { API } from "../services/api";
import { useState } from "react";
import backgroundImage from "../assets/ferraz-predio-imagem.jpeg";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate()

  const handleRedirect = async ()=>{
    navigate('/dashboard')
  }
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita recarregar a página
    try {
      const response = await API.post(
        `/auth/authenticate`,
        { email, senha },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Login bem-sucedido");
        await handleRedirect()
      } else {
        console.error("Login falhou");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="login-container">
      {/* Background */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Formulário de Login */}
      <div className="login-content">
        <form className="login-form" onSubmit={handleLogin}>
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
