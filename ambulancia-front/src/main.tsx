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

import Header from './components/Header.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Header/>
      <AppRoutes />
    </AuthProvider>
  </StrictMode>,
)
