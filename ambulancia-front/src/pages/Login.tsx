import { API } from "../services/api";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import backgroundImage from '../assets/ferraz-predio-imagem.jpeg';
import '../styles/Login.css'
const Login = () => {
  const handleLogin = async (email: string, senha: string) => {
    try {
      const response = await API.post(
        `/auth/authenticate`,
        { email, senha },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, // Permite que cookies sejam enviados e recebidos
        }
      );

      if (response.status === 200) {
        console.log('Login bem-sucedido');
      } else {
        console.error('Login falhou');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="login-container" style={{ position: 'relative', height: '100vh' }}>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
      }}
    ></div>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  </div>
  
  );
};

export default Login;
