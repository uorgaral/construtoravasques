import styled from "styled-components"
import { Container } from "react-bootstrap"

import iconeLampada from '../assets/Logos/lampada-incandescente 1.png'
import iconeCaneta from '../assets/Logos/escrita 1.png'
import iconeMapa from '../assets/Logos/mapa 2.png'

// Container principal com especificidade aumentada
const ContainerS = styled(Container)`
    && {
        height: auto; /* Melhor usar auto ou min-height para responsividade */
        min-height: 600px;
        width: 100%;
        display: flex;
        align-items: flex-start; /* Alinha os itens pelo topo */
        justify-content: center;
        flex-direction: row;
        gap: 50px; /* 200px pode ser muito grande para telas menores */
        padding: 40px 0;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
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

    h1 {
        font-size: 1.2rem;
        margin-top: 20px;
    }

    p {
        font-size: 1rem;
    }
`;

export default function Compromisso(){
    return(
        <ContainerS>
            <ItemCompromisso>
                <img src={iconeLampada} alt="Lâmpada" />
                <h1>CONTRATO TRANSPARENTE COM VALOR FECHADO</h1>
                <p>Contrato sem alteração de valores de materiais, mão de obra e administração por engenheiros qualificados.</p>
            </ItemCompromisso>

            <ItemCompromisso>
                <img src={iconeCaneta} alt="Caneta" />
                <h1>OBRA SEM DOR DE CABEÇA</h1>
                <p>Obra com planejamento e acompanhamento diário, sem falta de materiais, mão de obra qualificada e com entrega no prazo previsto.</p>
            </ItemCompromisso>

            <ItemCompromisso>
                <img src={iconeMapa} alt="Mapa" />
                <h1>AMPLA COBERTURA PARA TE ATENDER</h1>
                <p>Alcance em todas as cidades da região, desde Araçatuba/SP até Três Lagoas/SP.</p>
            </ItemCompromisso>
        </ContainerS>
    )
}