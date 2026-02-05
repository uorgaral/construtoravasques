import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import Carrossel from '../components/carrossel.jsx'
import Destaques from '../components/destaques.jsx'
import Montagem from '../components/galeria-home.jsx'
import Compromisso from '../components/compromisso.jsx'
import Feedbacks from  '../components/feedbacks.jsx'


const ContainerS = styled(Container)`
  && {
    min-height: 100vh;
    width: auto;
    max-width: 100%;
    padding: 0;
    overflow-x: none;
  }

  @media (max-width: 768px){
    width: 100%;
    height: auto;
    overflow-x: none;
  }
`;


export default function Home(){
    return(
        <ContainerS fluid>
            <Carrossel/>
            <Destaques/>
            <Montagem/>
            <Compromisso/>
            <Feedbacks/>
        </ContainerS>
    )
}