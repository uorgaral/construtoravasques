import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const DivS = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`


export default function Dashboard(){
    return(
        <DivS>
            <button><Link to="/" style={{color: 'black'}}>PÁGINA INICIAL</Link></button>
            <button><Link to="/admin/catalogo" style={{color: 'black'}}>VISÃO DO CATÁLOGO</Link></button>
            <button><Link to="/admin/adicionar_obra" style={{color: 'black'}}>ADICIONAR OBRA</Link></button>
        </DivS>
    )
    
}