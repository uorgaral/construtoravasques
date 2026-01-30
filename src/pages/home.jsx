import { Container } from 'react-bootstrap'
import styled from 'styled-components'


import Carrossel from '../components/carrossel'
import Destaques from '../components/destaques.jsx'
import Montagem from '../components/galeria-home.jsx'
import Compromisso from '../components/compromisso.jsx'

const ContainerS = styled(Container)`
    && {
        min-height: 100vh;
        height: auto,
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        top: 0;
        padding: 0;

    }
`

export default function Home(){
    return(
        <ContainerS fluid>
            <Carrossel/>
            <Destaques/>
            <Montagem/>
            <Compromisso/>
        </ContainerS>
    )
}