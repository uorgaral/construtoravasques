import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

import iconeLampada from '../assets/Logos/lampada-incandescente 1.png';
import iconeCaneta from '../assets/Logos/escrita 1.png';
import iconeMapa from '../assets/Logos/mapa 2.png';

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
    max-width: 280px;
    width: 100%;
  }

  @media (max-width: 768px){
    flex-direction: row;
    display: flex;
    text-align: end;
  }
`;

const Titulo = styled.h2`
  && {
    font-family: "Coolvetica", sans-serif;
    font-size: 32px;
    color: #6D070E;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 300;
  }

  @media (max-width: 768px){
    text-align: center;
    font-size: 26px;
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
            <h1>CONTRATO TRANSPARENTE COM VALOR FECHADO</h1>
            <p>
              Contrato sem alteração de valores de materiais, mão de obra e
              administração por engenheiros qualificados.
            </p>
          </div>
        </ItemCompromisso>

        <ItemCompromisso>
          <img src={iconeCaneta} alt="Caneta" />
          <div className="text-wrapper">
            <h1>OBRA SEM DOR DE CABEÇA</h1>
            <p>
              Obra com planejamento e acompanhamento diário, sem falta de
              materiais, mão de obra qualificada e com entrega no prazo previsto.
            </p>
          </div>
        </ItemCompromisso>

        <ItemCompromisso>
          <img src={iconeMapa} alt="Mapa" />
          <div className="text-wrapper">
            <h1>AMPLA COBERTURA PARA TE ATENDER</h1>
            <p>
              Alcance em todas as cidades da região, desde Araçatuba/SP até Três
              Lagoas/SP.
            </p>
          </div>
        </ItemCompromisso>
      </WrapperItens>
    </ContainerS>
  );
}