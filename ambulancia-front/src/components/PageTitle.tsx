import { useLocation } from 'react-router-dom';
import './PageTitle.css';  // Importe o arquivo CSS

const PageTitle = () => {
  const location = useLocation();

  let title = '';
  
  // Verifique a rota atual e defina o título de acordo
  switch (location.pathname) {
    default:
      title = '';
  }

  if (title !== '') {
    return (
      <div className='default-h1'>
        <h1>{title}</h1>
      </div>
    );
  }

  return null;  // Caso não haja título
};

export default PageTitle;
