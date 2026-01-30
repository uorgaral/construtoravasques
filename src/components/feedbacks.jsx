import styled from "styled-components";
import { Container } from "react-bootstrap";

import iconeChat from '../assets/Logos/bubble-chat 1.png';
import iconeFamilia from '../assets/Logos/familia 1 .png';


const ContainerS = styled(Container)`
    && {
        height: auto;
        min-height: 600px;
        width: 100%;
        display: flex;
        align-items: flex-start; 
        justify-content: center;
        flex-direction: row;
        gap: 50px; 
        padding: 40px 0;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
        }
    }
`;

const ItemFeedback = styled.div`
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

export default function Feedbacks(){
    return(
        <ContainerS>
            <div>
                <img src={iconeChat}/>
            </div>
            <ItemFeedback>
                <img src={iconeFamilia}/>
                <h1>OBRA SEM DOR DE CABEÇA</h1>
                <p>Obra com planejamento e acompanhamento diário, sem falta de materiais, mão de obra qualificada e com entrega no prazo previsto.</p>
            </ItemFeedback>
        </ContainerS>
    )
}