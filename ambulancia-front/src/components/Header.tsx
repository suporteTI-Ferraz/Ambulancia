
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
const Header: React.FC = () => {
      const { isLoggedIn } = useAuth();
    if (isLoggedIn) {

        return (
            <header className="header">
                <div className="header-logo">
                    <a href="/">Logo</a>
                </div>
                <nav className="header-nav">
                    <ul className="nav-list">
                        <li><a href="/" className="nav-link">Home</a></li>
                        <li><a href="/about" className="nav-link">About</a></li>
                        <li><a href="/services" className="nav-link">Services</a></li>
                        <li><a href="/sair" className="nav-link">Sair</a></li>
                    </ul>
                </nav>
            </header>
        );
    }else{
        return (
            <header className="header">
                <div className="header-logo">
                    <a href="/">Logo</a>
                </div>
                <nav className="header-nav">
                    <ul className="nav-list">
                        <li><a href="/" className="nav-link">Home</a></li>
                        <li><a href="/sair" className="nav-link">Sair</a></li>
                        <li><a href="/services" className="nav-link">Services</a></li>
                        <li><a href="/sair" className="nav-link">Sair</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
