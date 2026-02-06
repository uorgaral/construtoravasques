import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import supabase from '../utils/supabase_client'
import { Container, Row, Col, Stack, Image } from "react-bootstrap";
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
    font-family: "CHANEY", sans-serif;
    color: #6D070E;
    letter-spacing: 2px;
    margin-bottom: 30px;
  }

  @media (max-width: 768px){
    text-align: center;
    font-size: 26px;
  }
`;

// Wrapper para o Grid que permite o scroll no mobile
const ResponsiveGrid = styled(Row)`
  width: 100%;
  max-width: 1000px; // Diminui o tamanho total do bloco no desktop
  justify-content: center;
  margin-top: 40px;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: nowrap; // Impede que as imagens quebrem linha
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 20px;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none; // Esconde a barra de rolagem
    }
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  aspect-ratio: 4 / 5;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    min-width: 70%; // Imagem menor no mobile (antes era 85%)
    scroll-snap-align: center;
    margin: 0 10px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export default function Catalogo(){
    const [imagens, setImagens] = useState([]);

    useEffect(() => {
        async function GeralObras(){
            const { data, error } = await supabase
            .from("ListaObras")
            .select("*");

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

            <Stack direction="horizontal" gap={2} className="justify-content-center">
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                    <ToggleButton id="tbg-radio-1" value={1} variant="outline-danger">Geral</ToggleButton>
                    <ToggleButton id="tbg-radio-2" value={2} variant="outline-danger">Residencial</ToggleButton>
                    <ToggleButton id="tbg-radio-3" value={3} variant="outline-danger">Comercial</ToggleButton>
                    <ToggleButton id="tbg-radio-4" value={4} variant="outline-danger">Reforma</ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            
            <ResponsiveGrid>
                {imagens.map((item) => (
                    // md={4} define 3 colunas no desktop. m-0 e p-2 para melhor ajuste.
                    <Col key={item.id || item.img_url} xs="auto" md={3} className="mb-4 p-2">
                        <ImageWrapper>
                            <Image src={item.img_url} alt="Obra Catalogo" />
                        </ImageWrapper>
                    </Col>
                ))}
            </ResponsiveGrid>
        </ContainerS>
    )
}