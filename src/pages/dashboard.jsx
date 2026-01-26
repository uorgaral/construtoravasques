import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const DivS = styled.div`
    display: flex;
    flex-direction: column;

`


export default function Dashboard(){
    return(
        <DivS>
            <Link to="/" style={{color: 'black'}}>PÁGINA INICIAL</Link>
            <Link to="/catalogo" style={{color: 'black'}}>CATÁLOGO</Link>
            <Link to="/admin/adicionar_obra" style={{color: 'black'}}>ADICIONAR OBRA</Link>
        </DivS>
    )
    
}