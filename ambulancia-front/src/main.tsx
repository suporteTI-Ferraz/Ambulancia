import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes/AppRoutes.tsx';
import { AuthProvider } from './contexts/AuthProvider.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from './contexts/LoadingContext.tsx';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importando os ícones do React Icons

function App() {
  // Lendo o estado inicial do tema do localStorage
  const savedTheme = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(savedTheme);

  // Usando useEffect para aplicar o tema ao body quando o estado mudar
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    // Salvando a preferência no localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]); // Sempre que o darkMode mudar, o efeito é executado

  const toggleTheme = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  return (
    <div>
      {/* Botão de alternância de tema */}
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {darkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
      </button>

      {/* Rotas da aplicação */}
      <AppRoutes />

      <ToastContainer position="top-center" />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </AuthProvider>
  </StrictMode>,
);
