import { createContext, useContext } from 'react';


interface AuthContextType {
    isLoggedIn: boolean;
    checkLoginStatus: () => void; // Método para verificar se o usuário está logado
  }

  export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};