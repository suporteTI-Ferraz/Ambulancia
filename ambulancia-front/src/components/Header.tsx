import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/api/UserService';
import { LuLogOut } from "react-icons/lu";
import '../styles/Header.css';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
} from 'reactstrap';

const Header: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const sair = async () => {
        try {
            await logout();
            handleLogout();
        } catch (error) {
            // Tratar erro, se necessário
        }
    };

    const toggleNavbar = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleUserRoute = () => navigate("/gerenciar-funcionarios");
    const handlePacienteRoute = () => navigate("/gerenciar-pacientes");
    const handleMotoristaRoute = () => navigate("/gerenciar-motoristas");
    const handleHospitalRoute = () => navigate("/gerenciar-hospitais");
    const handleVeiculoRoute = () => navigate("/gerenciar-ambulancias");
    const handleAgendarDiaRoute = () => navigate("/gerenciar-agendamentos/");
    const handleLogout = () => window.location.reload();

    return (
        <>
            {isLoggedIn && (
                <Navbar className="custom-navbar" expand="md">
                    <NavbarBrand href="/dashboard" className="navbar-brand">
                        <img src="/assets/icones_gamun/icone_gamun.png" alt="gamun" style={{ height: '55px' }} />
                    </NavbarBrand>

                    <NavbarToggler className="hamburguer" onClick={toggleNavbar}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="hamburguer-icon"
                            fill="none"
                            stroke="white"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </NavbarToggler>

                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <NavLink href="/" className="nav-link">Início</NavLink>
                            </NavItem>

                            <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                                <DropdownToggle nav caret className="nav-link">
                                    Atalhos
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-dark" end>
                                    <div className="dropdown-grid">
                                        <div>
                                            <DropdownItem onClick={handleUserRoute}>Usuários</DropdownItem>
                                            <DropdownItem onClick={handlePacienteRoute}>Pacientes</DropdownItem>
                                            <DropdownItem onClick={handleMotoristaRoute}>Motoristas</DropdownItem>
                                        </div>
                                        <div>
                                            <DropdownItem onClick={handleHospitalRoute}>Hospitais</DropdownItem>
                                            <DropdownItem onClick={handleVeiculoRoute}>Veículos</DropdownItem>
                                            <DropdownItem onClick={handleAgendarDiaRoute}>Agendamento</DropdownItem>
                                        </div>
                                    </div>
                                </DropdownMenu>
                            </Dropdown>

                            <NavItem>
                                <NavLink href="/dashboard-relatorios" className="nav-link">Relatórios</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink href="/" onClick={sair} className="nav-link">
                                    Sair <LuLogOut />
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            )}
        </>
    );
};

export default Header;