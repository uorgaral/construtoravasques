import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import supabase from '../utils/supabase_client'
import { Container, Row, Col, Stack, Card } from "react-bootstrap";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';


const ContainerS = styled(Container)`
    padding-top: 100px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Titulo = styled.h1`
  && {
    font-family: "Coolvetica", sans-serif;
    color: #6D070E;
    letter-spacing: 2px;
  }

  @media (max-width: 768px){
    text-align: center;
    font-size: 26px;
  }
`;

const StackS = styled(Stack)`
    justify-content: center;
`

export default function Catalogo(){
    const [imagens, setImagens] = useState([]);

    useEffect(() => {
        async function GeralObras(){
            const { data, error } = await supabase
            .from("ListaObras")
            .select("*")

        if (error) {
            console.log(error);
            alert("Erro ao importar imagens");
        } else {
            setImagens(data);
        }
        }
        GeralObras();
    }, []);

    return(
        <ContainerS fluid>
            <Titulo>Catálogo</Titulo>

            <StackS direction="horizontal" gap={2}>
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                    <ToggleButton id="tbg-radio-1" value={1}>Geral</ToggleButton>
                    <ToggleButton id="tbg-radio-2" value={2}>Residencial</ToggleButton>
                    <ToggleButton id="tbg-radio-3" value={3}>Comercial</ToggleButton>
                    <ToggleButton id="tbg-radio-4" value={4}>Reforma</ToggleButton>
                </ToggleButtonGroup>
            </StackS>
            
            <Row className="justify-content-center">
                {imagens.map((item) => (
                    <Col key={item.id || item.img_url} xs={12} md={4} className="mb-4">
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={item.img_url} />
                        <Card.Body>
                            <Card.Title>{item.titulo}</Card.Title>
                            <Card.Text>{item.desc}</Card.Text>
                            <button>Detalhes</button>
                        </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </ContainerS>
    )
}