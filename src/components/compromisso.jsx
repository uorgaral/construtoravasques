import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

import iconeLampada from '../assets/Logos/lampada-incandescente 1.png';
import iconeSeguranca from '../assets/Logos/escudo.png';
import iconePremio from '../assets/Logos/garantia.png';

// Container com especificidade reforçada
const ContainerS = styled(Container)`
  && {
    min-height: 500px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #999999;
    padding: 40px 15px;
    gap: 40px;

    @media (max-width: 768px) {
      height: auto;
    }
  }
`;

const WrapperItens = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ItemCompromisso = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  flex: 1;
  width: 100%;
  max-width: 350px;
  gap: 18px;

  img {
    max-width: 80px;
    height: auto;
    margin-bottom: 15px;
    
    @media (max-width: 768px){
      max-width: 60px;
      height: auto;
    }
  }

  && h1 {
    font-size: 1.2rem;
    margin-top: 10px;
    color: #9F111B;
    font-weight: bold;
    line-height: 1.3;
  }

  && p {
    font-size: 1rem;
    color: #000000;
    margin-top: 10px;

    @media (max-width: 768px){
      font-size: 0.9rem;
    }
  }

  .text-wrapper {
    max-width: 200px;
    width: 100%;
  }

  @media (max-width: 768px){
    flex-direction: row;
    display: flex;
    text-align: end;
  }
`;

const Titulo = styled.h2`
  font-family: "CHANEY", sans-serif;
  font-size: 40px;
  color: #6d070e;
  margin-bottom: 35px;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 400;
  position: relative;
  text-align: center;

  &::after {
    content: "";
    width: 60px;
    height: 3px;
    background-color: #6d070e;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: 768px){
    font-size: 25px;
    word-wrap: break-word;
    line-height: 1.2;
  }
`;

export default function Compromisso() {
  return (
    <ContainerS fluid>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Titulo>Compromisso, qualidade e confiança</Titulo>
      </div>

      <WrapperItens>
        <ItemCompromisso>
          <img src={iconeLampada} alt="Lâmpada" />
          <div className="text-wrapper">
            <h1>Contrato transparente com valor fechado!</h1>
            <p>Transparência do orçamento à entrega.</p>
          </div>
        </ItemCompromisso>

        <ItemCompromisso>
          <img src={iconeSeguranca} alt="Caneta" />
          <div className="text-wrapper">
            <h1>Monitoramento 24h</h1>
            <p>Controle total para uma execução sem imprevistos.</p>
          </div>
        </ItemCompromisso>

        <ItemCompromisso>
          <img src={iconePremio} alt="Mapa" />
          <div className="text-wrapper">
            <h1>60 Obras entregues em toda a região!</h1>
            <p>Histórico que comprova qualidade.</p>
          </div>
        </ItemCompromisso>
      </WrapperItens>
    </ContainerS>
  );
}