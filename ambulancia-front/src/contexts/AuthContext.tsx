import { createContext, useContext } from 'react';


interface AuthContextType {
    isLoggedIn: boolean;
    checkLoginStatus: () => void; // Método para verificar se o usuário está logado
  }

  export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Usuário deve estar dentro do compoenente AuthProvider');
  }
  return context;
};