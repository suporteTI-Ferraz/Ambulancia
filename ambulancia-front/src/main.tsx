import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/AppRoutes.tsx'
import { AuthProvider } from './contexts/AuthProvider.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from './contexts/LoadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <AppRoutes />
        <ToastContainer 
        position="top-center" 
        />
      </LoadingProvider>
    </AuthProvider>
  </StrictMode>,
);
