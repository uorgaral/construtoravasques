import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

import iconeFamilia from '../assets/Logos/familia 1.png'
import iconeChat from '../assets/Logos/bubble-chat 1.png'

const ContainerS = styled(Container)`
    && {
        min-height: 500px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 60px 20px;
        background-color: #6D070E;
        gap: 40px;
    }
`;

const ItemFeedback = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    text-align: start;
    gap: 20px;
    width: 100%;
    max-width: 900px;

    img {
        width: 80px;
        height: 80px;
        object-fit: contain;
    }

    @media (max-width: 768px) {
        flex-direction: column; 
        text-align: center; 
        
        div {
            align-items: center !important; 
        }
    }
`;

const Titulo = styled.h2`
  font-family: "Coolvetica", sans-serif;
  font-size: 2rem; 
  color: #f7f7f7;    
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const TitTexto = styled.h3`
  font-family: "Coolvetica", sans-serif;
  font-size: 20px; 
  color: #f7f7f7;
  letter-spacing: 2px;
  font-weight: 300;
`;

const Parag = styled.p`
  font-family: "Coolvetica", sans-serif;
  font-size: 18px; 
  color: #f7f7f7;
  letter-spacing: 2px;
`;

export default function Feedbacks(){
    return(
        <ContainerS fluid>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 20}}>
                <img src={iconeChat}/>
                <Titulo>Feedbacks</Titulo>
            </div>
            <ItemFeedback>  
                <img src={iconeFamilia}/>
                <div style={{display: "flex", flexDirection: "column", textAlign: "start", gap:5, width: "100%", maxWidth: "900px"}}>
                    <TitTexto>João José e Família</TitTexto>
                    <Parag>"Boa tarde!Eu, e meus familiares, estamos a agradecer a Vasques Construtora, pela construção da edícula.<br/>
                        Todos, estamos felizes por mais esta vitória em nossas vidas.<br/>
                        Agradecemos a Deus, pelo término da obra, sem incidente e acidente, o que para nós é motivo de muita alegria."</Parag>
                </div>
            </ItemFeedback>

            <ItemFeedback>  
                <img src={iconeFamilia}/>
                <div style={{display: "flex", flexDirection: "column", textAlign: "start", gap:5, width: "100%", maxWidth: "900px"}}>
                    <TitTexto>Miguel e Família</TitTexto>
                    <Parag>"Obrigado, Vasques Construtora! <br/>
                        E parabéns pela excelência no que vcs fazem, pela equipe fantástica e bem qualificada<br/>
                        e por ser um diferencial na área! Deus os abençôe!!"</Parag>
                </div>
            </ItemFeedback>
        </ContainerS>
    )
}