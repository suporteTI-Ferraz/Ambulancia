// components/PageTitle.tsx
import { useLocation } from 'react-router-dom';

const PageTitle = () => {
  const location = useLocation();

  let title = '';
  
  // Verifique a rota atual e defina o título de acordo
  switch (location.pathname) {
    case '/dashboard':
      title = 'Gerenciar Sistema';
      break;
    case '/profile':
      title = 'Perfil';
      break;
  }
  if(title !== ''){
  return (
    <div className='default-h1'>
      <h1>{title}</h1>
    </div>
  );
};
};
export default PageTitle;
