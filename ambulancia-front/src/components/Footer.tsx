import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            backgroundColor: '#f8f9fa',
            textAlign: 'center',
            padding: '20px',
            marginTop: '20px',
            borderTop: '1px solid #ddd'
        }}>
            <p style={{ marginBottom: '10px', fontSize: '16px', color: '#333' }}>
                Em uma parceria com
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <img
                    src="../assets/fatec-ferraz.png" // Substitua pelo caminho correto da sua logo
                    alt="Logo Fatec"
                    style={{ width: '130px', height: '100px' }}
                />
                <img
                    src="../assets/brasao.png" // Substitua pelo caminho correto do brasão
                    alt="Brasão Prefeitura"
                    style={{ width: '150px', height: '150px' }}
                />
            </div>

            <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
                Desenvolvido por: Fatec Ferraz de Vasconcelos.
            </p>
            <p style={{ fontSize: '12px', color: '#777' }}>
                © 2025 Ambulância Prefeitura Municipal de Ferraz de Vasconcelos, Todos os direitos reservados.
            </p>
        </footer>
    );
};

export default Footer;
