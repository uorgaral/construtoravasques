import { Container } from 'react-bootstrap'
import Carrossel from '../components/carrossel'
import styled from 'styled-components'


const ContainerS = styled(Container)`
    && {
        height: 100vh;
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        padding: 0;
    }
`

export default function Home(){
    return(
        <ContainerS fluid>
            <Carrossel/>
        </ContainerS>
    )
}