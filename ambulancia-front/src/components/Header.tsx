
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
   
    const toggleNavbar = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleUserRoute = () =>{
        navigate("/gerenciar-funcionarios")
      }
      const handlePacienteRoute = () =>{
        navigate("/gerenciar-pacientes")
      }
    
      const handleMotoristaRoute = () =>{
        navigate("/gerenciar-motoristas")
      }
    
      const handleHospitalRoute = () =>{
        navigate("/gerenciar-hospitais")
      }
      const handleVeiculoRoute = () =>{
        navigate("/gerenciar-ambulancias")
      }
    
      const handleAgendarDiaRoute = () =>{
        navigate("/gerenciar-agendamentos/")
    
      }

    return (
        <Navbar color="light" light expand="md">
          {/* Logo no NavbarBrand */}
          <NavbarBrand href="/">
            <img
              src="../public/assets/brasao.png"  // Substitua pela sua logo
              alt="Logo"
              className="me-2"
              style={{ width: '150px', height: '100px', borderRadius: '50%' }}
            />
            Ambulâncias
          </NavbarBrand>
    
          {/* Botão para abrir menu em telas pequenas */}
          <NavbarToggler onClick={toggleNavbar} />
    
          {/* Itens do menu */}
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink href="/">Início</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">Sobre</NavLink>
              </NavItem>
    
              {/* Dropdown */}
              <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret>
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
    
              <NavItem>
                <NavLink href="/contact">Contato</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      );
    };

export default Header;
