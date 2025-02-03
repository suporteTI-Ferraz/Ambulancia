import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/AppRoutes.tsx'
import { AuthProvider } from './contexts/AuthProvider.tsx'
import './styles/Header.css'
import './styles/Global.css'
import './styles/Dashboard.css'
import './styles/User.css'
import './styles/EditUserModal.css'
import './styles/IconStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './styles/AgendamentoForm.css'
import './styles/AgendamentoList.css'


import Header from './components/Header.tsx'
import { LoadingProvider } from './contexts/LoadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Header />
      <LoadingProvider>
        <AppRoutes />
        <ToastContainer />
      </LoadingProvider>
    </AuthProvider>
  </StrictMode>,
);
