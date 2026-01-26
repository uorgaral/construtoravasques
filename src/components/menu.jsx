import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import AppRoutes from '../routes';
import { useState } from 'react';
import { Link } from 'react-router-dom';

//imagens
import LogoBranco from '../assets/LogoBranco.png'
import LogoVermelho from '../assets/LogoVermelho.png'
import LogoGrande from '../assets/LogoGrande.png'

//imports do bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownDivider } from 'react-bootstrap';

//Estilos Desktop
const NavbarS  = styled(Navbar)`
  background-color: rgba(235, 235, 235, 0.1);
  width: 100vw;

  @media (max-width: 768px){
    display: none;
  };
`;


const LogoImg = styled.img`
  width: 36px;
  height: 36px;
  transition: 0.2 ease;

  opacity: ${({ $hover }) => ($hover ? 0.85 : 1)};
  transform: ${({ $hover }) => ($hover ? 'scale(1.08)' : 'scale(1)')};
`;

const NavLinkS = styled(Link)`
  font-family: "Bakbak One", sans-serif;
  font-size: 20px;
  color: #F7F7F7;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #B6222A;
    transform: scale(1.08);
  }
`;

const ContainerS = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;

const NavS = styled(Nav)`
  gap: 40px;
  display: flex;
  align-items: center
`;

//Estilos Mobile
const DropdownS = styled(Dropdown)`
  @media (min-width: 769px){
    display: none;
  };
`

const DropdownBotaoS = styled(Dropdown.Toggle)`
  padding: 16px;
  background-color: #9F111B;
  border:none;

  &:hover{
  background-color: #6d070e;
  }
  &:focus, 
  &:focus-visible,
  &:active, 
  &.show{
    background-color: #6d070e !important;
    outline: none !important;
  }
`

const DropdownItemS = styled(Dropdown.Item)`
  font-family: "Bakbak One", sans-serif;
  font-size: 20px;
  color: #9F111B;
  text-shadow: 5px 4px -4px rgba(0, 0, 0, 0.20);
  text-align: left;

  &:hover{
  color: #6d070e;
  };

  &:focus, 
  &:focus-visible,
  &:active, 
  &.show{
    color: #6d070e !important;
    outline: none !important;
    background-color: #d6d4d4 !important; 
  };
`
const DropdownMenuS = styled(Dropdown.Menu)`
  padding: 10px;
`

//Código
export default function Menu() {
  const [hover, setHover] = useState(false);


  return (
    <>
      <NavbarS fixed="top">
            <ContainerS>

              <Navbar.Brand 
              as={Link}
              to="/"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              >
                <LogoImg src={hover ? LogoVermelho : LogoBranco} $hover={hover}/>
              </Navbar.Brand>

              <NavS>
                <NavLinkS to="/">PÁGINA INCIAL </NavLinkS>
                <NavLinkS to="/catalogo">CATÁLOGO</NavLinkS>
                <NavLinkS to="/admin">ADMINISTRADOR</NavLinkS>
              </NavS>
            </ContainerS>
        </NavbarS>

        <div style={{width: 100, position: 'fixed', top: 20, right: 10}}>
        <DropdownS>
          <DropdownBotaoS id="dropdown-autoclose-true">
            <img src={LogoBranco}></img>
          </DropdownBotaoS>

          <DropdownMenuS>
            <Dropdown.Header><img src={LogoGrande} style={{width: 134, height: 30}}/></Dropdown.Header>
            <DropdownItemS href="/">PÁGINA INICIAL</DropdownItemS>
            <DropdownItemS href="/catalogo">CATÁLOGO</DropdownItemS>
          </DropdownMenuS>
        </DropdownS>
        </div>
        
    </>
      
  );
}
