import React from 'react';
import styles from './Footer.module.css'; // Importa o CSS module

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>Em uma parceria com</p>

            <div className={styles.logos}>
                <img
                    src="../assets/fatec-ferraz-white.png" // Substitua pelo caminho correto
                    alt="Logo Fatec"
                    className={styles.logo}
                />
                <img
                    src="../assets/brasao.png" // Substitua pelo caminho correto
                    alt="Brasão Prefeitura"
                    className={styles.logo}
                />
            </div>

            <p className={styles.developedBy}>Desenvolvido pela Fatec - Ferraz de Vasconcelos.</p>
            <p className={styles.copyright}>
                © 2025 Ambulância Prefeitura Municipal de Ferraz de Vasconcelos, Todos os direitos reservados.
            </p>
        </footer>
    );
};

export default Footer;
