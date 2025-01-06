import React, { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { API } from '../services/api';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLoginStatus = async () => {
    try {
      const response = await API.get("/auth/check", { withCredentials: true });
      if (response.status === 200) {
        console.log("Método check")
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false); // Certifica-se de que `loading` é atualizado corretamente
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Chama a verificação de login apenas na montagem do componente
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Adiciona uma tela de carregamento, opcional
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
