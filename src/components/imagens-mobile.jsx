import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";


import Piscina from '../assets/ImagensHomeGaleria/Piscina.png'
import MinhaCasaVida from '../assets/ImagensHomeGaleria/MinhaCasaVida.png'
import Liberale from '../assets/ImagensHomeGaleria/Liberale.png'
import InteriorHugo from '../assets/ImagensHomeGaleria/InteriorHugo.jpeg'
import InteriorExterno from '../assets/ImagensHomeGaleria/InteriorExterno.png'
import FachadaHugo from '../assets/ImagensHomeGaleria/FachadaHugo.jpeg'
import Fachada from '../assets/ImagensHomeGaleria/Fachada.png'
import Fachada3 from '../assets/ImagensHomeGaleria/Fachada3.JPG'
import FachadaComercial from '../assets/ImagensHomeGaleria/FachadaComercial.png'

const photos = [
  { src: FachadaComercial, title: "Fachada Comercial", subtitle: "Projeto Corporativo" },
  { src: FachadaHugo, title: "Residência Hugo", subtitle: "Fachada Principal" },
  { src: InteriorExterno, title: "Área Externa", subtitle: "Lazer e Paisagismo" },
  { src: MinhaCasaVida, title: "Minha Casa Vida", subtitle: "Projeto Residencial" },
  { src: Piscina, title: "Área da Piscina", subtitle: "Lazer Completo" },
  { src: InteriorHugo, title: "Interior Hugo", subtitle: "Design de Interiores" },
  { src: Liberale, title: "Edifício Liberale", subtitle: "Arquitetura Moderna" },
  { src: Fachada, title: "Fachada Residencial", subtitle: "Projeto Contemporâneo" },
  { src: Fachada3, title: "Perspectiva", subtitle: "Vista Superior" },
];

const ContainerS = styled(Container)`
  padding-top: 20px;
  padding-bottom: 20px;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

export default function ImagemMobile() {
  return (
    <ContainerS>
        <Carousel>
            <Row className="g-4"> {/* g-4 adiciona espaçamento entre os cards */}
                {photos.map((photo, index) => (
                <Col xs={12} key={index}>
                    <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">{photo.subtitle}</p>
                        <small className="text-default-500">Galeria</small>
                        <h4 className="font-bold text-large">{photo.title}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <img
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={photo.src}
                        width="100%"
                        />
                    </CardBody>
                    </Card>
                </Col>
                ))}
            </Row>
        </Carousel>
      
    </ContainerS>
  );
}