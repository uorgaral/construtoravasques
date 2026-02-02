import styled from "styled-components"
import { Container } from "react-bootstrap"

import iconeLampada from '../assets/Logos/lampada-incandescente 1.png'
import iconeCaneta from '../assets/Logos/escrita 1.png'
import iconeMapa from '../assets/Logos/mapa 2.png'

// Container principal com especificidade aumentada
const ContainerS = styled(Container)`
    && {
        min-height: 500px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #999999;
        gap: 40px;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 50px;
        }
    }
`;

const ItemCompromisso = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    flex: 1;
    width: 100%; /* Garante que ocupe a largura disponível */

    img {
        max-width: 80px; /* Ajuste o tamanho do ícone se necessário */
        height: auto;
    }

    h1 {
        font-size: 1.2rem;
        margin-top: 20px;
        color: #9F111B;
    }

    p {
        font-size: 1rem;
        color: black;
    }

    .text-wrapper {
        max-width: 280px;
        width: 100%;
    }
`;


const Titulo = styled.h2`
  font-family: "Cold Warm", sans-serif;
  font-size: 32px; 
  color: #6D070E;    
  margin-bottom: 30px; 
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 300;
`;

const WrapperItens = styled.div`
    display: flex;
    flex-direction: row;
`


export default function Compromisso(){
    return(
        <ContainerS fluid>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Titulo>Feedbacks</Titulo>
            </div>

            <WrapperItens>
                <ItemCompromisso>
                <img src={iconeLampada} alt="Lâmpada" />
                
                <div className="text-wrapper">
                    <h1>CONTRATO TRANSPARENTE COM VALOR FECHADO</h1>
                    <p>Contrato sem alteração de valores de materiais, mão de obra e administração por engenheiros qualificados.</p>
                </div>
            </ItemCompromisso>

            <ItemCompromisso>
                <img src={iconeCaneta} alt="Caneta" />
                <div className="text-wrapper">
                    <h1>OBRA SEM DOR DE CABEÇA</h1>
                    <p>Obra com planejamento e acompanhamento diário, sem falta de materiais, mão de obra qualificada e com entrega no prazo previsto.</p>
                </div>
            </ItemCompromisso>

            <ItemCompromisso>
                <img src={iconeMapa} alt="Mapa" />
                <div className="text-wrapper">
                    <h1>AMPLA COBERTURA PARA TE ATENDER</h1>
                    <p>Alcance em todas as cidades da região, desde Araçatuba/SP até Três Lagoas/SP.</p>  
                </div>
            </ItemCompromisso>
            </WrapperItens>
        </ContainerS>
    )
}