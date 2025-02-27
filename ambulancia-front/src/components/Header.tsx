import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'

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
            {/* Div separada para a logo */}
            <div className="header-logo">
                <img
                    src="/assets/brasao-uva-horizontal.png"
                    alt="Logo"
                    className="logo-img"
                />
            </div>

            {/* Navbar com fundo preto */}
            <Navbar className="custom-navbar" expand="md">
                <NavbarBrand href="/" className="navbar-brand">Ambulâncias</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            <NavLink href="/" className="nav-link">Início</NavLink>
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

export default Header;
