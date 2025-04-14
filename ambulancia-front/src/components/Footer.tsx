import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Importa o contexto de autenticação
import styles from './Footer.module.css'; // Importa o CSS module

const Footer: React.FC = () => {
  const { isLoggedIn } = useAuth(); // Verifica se o usuário está logado

  return (
    <>
      {isLoggedIn && (  // Só exibe o footer se o usuário estiver logado
        <footer className={styles.footer}>
          <p className={styles.text}>Em uma parceria com</p>

          <div className={styles.logos}>
            <img
              src="../assets/fatec-ferraz.png"
              alt="Logo Fatec"
              className={styles.logo}
            />
            <img
              src="../assets/brasao.png"
              alt="Brasão Prefeitura"
              className={styles.logo}
            />
          </div>

          <p className={styles.developedBy}>Desenvolvido pela Fatec - Ferraz de Vasconcelos.</p>
          <p className={styles.copyright}>
            © 2025 Ambulância Prefeitura Municipal de Ferraz de Vasconcelos, Todos os direitos reservados.
          </p>
        </footer>
      )}
    </>
  );
};

export default Footer;
