import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css'

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

const NavBar: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleNavbar = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleUserRoute = () => navigate("/gerenciar-funcionarios");
    const handlePacienteRoute = () => navigate("/gerenciar-pacientes");
    const handleMotoristaRoute = () => navigate("/gerenciar-motoristas");
    const handleHospitalRoute = () => navigate("/gerenciar-hospitais");
    const handleVeiculoRoute = () => navigate("/gerenciar-ambulancias");
    const handleAgendarDiaRoute = () => navigate("/gerenciar-agendamentos/");

    return (
        <>
            <Navbar className="custom-navbar" expand="md">
                <NavbarBrand href="#" className="navbar-brand">Ambulâncias</NavbarBrand>
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
                            <NavLink href="/" className="nav-link hover:bg-pink-500">Início</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/about" className="nav-link">Sobre</NavLink>
                        </NavItem>

                        {isLoggedIn && (
                            <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                                <DropdownToggle nav caret className="nav-link">
                                    Gerenciar
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem onClick={handleUserRoute}>Usuários</DropdownItem>
                                    <DropdownItem onClick={handlePacienteRoute}>Pacientes</DropdownItem>
                                    <DropdownItem onClick={handleMotoristaRoute}>Motoristas</DropdownItem>
                                    <DropdownItem onClick={handleHospitalRoute}>Hospitais</DropdownItem>
                                    <DropdownItem onClick={handleVeiculoRoute}>Veículos</DropdownItem>
                                    <DropdownItem onClick={handleAgendarDiaRoute}>Agendamento</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href="/contact">Fale Conosco</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        )}

                        <NavItem>
                            <NavLink href="/contact" className="nav-link">Contato</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>

        </>
    );
};

export default NavBar;
