import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Button } from "react-bootstrap"

const DivS = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100vw;
    height: 100vh;
`
const ButtonS = styled(Button)`
  background-color: transparent;
  border: 3px solid #6D070E;
  color: #6D070E;
  font-weight: 500;
  text-decoration: none;
  transition: 0.3 ease;

  &:hover{
    background-color: transparent;
    border: 3px solid #a7111b;
    color: #a7111b;
  }
`

const Titulo = styled.h1`
  font-family: "CHANEY", sans-serif;
  color: #6D070E;
  margin-bottom: 30px;
`;


export default function Dashboard(){
    return(
        <DivS>
            <Titulo>Seja bem vindo!</Titulo>
            <ButtonS href="/">PÁGINA INICIAL</ButtonS>
            <ButtonS href="/admin/catalogo_adm">VISÃO DO CATÁLOGO</ButtonS>
            <ButtonS href="/admin/adicionar_obra">ADICIONAR OBRA</ButtonS>
        </DivS>
    )
    
}