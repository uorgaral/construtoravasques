import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

import Whats from "../assets/Logos/whatsapp.png"
import Insta from "../assets/Logos/instagram.png"


const ContainerS = styled(Container)`
    && {
        height: 600px;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`;

const Titulo = styled.h2`
  font-family: "CHANEY", sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  color: #6d070e;
  margin-bottom: 50px;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 400;
  position: relative;
  text-align: center;

  &::after {
    content: "";
    width: 60px;
    height: 3px;
    background-color: #6d070e;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const IconLink = styled.a`
  margin: 0 20px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 60px;
    height: auto;
  }
`;


const MapWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 300px;
  margin-top: 50px;
  border-radius: 15px;
  overflow: hidden; // Garante que as bordas arredondadas funcionem
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;


export default function Contato(){
    const instaLink = "https://www.instagram.com/construtoravasques/"
    const whatsLink = "https://wa.me/message/J6WXFP6H5E55D1"

    return(
        <ContainerS>
            <Titulo>Entre em contato!</Titulo>

            <div style={{display: "flex", flexDirection: "row", gap: 20 }}>
                <IconLink href={whatsLink} target="_blank" rel="noopener noreferrer">
                    <img src={Whats}/>
                </IconLink>

                <IconLink href={instaLink} target="_blank" rel="noopener noreferrer">
                    <img src={Insta}/>
                </IconLink>
            </div>

            <MapWrapper>
                <iframe src="https://www.google.com/maps/embed?pb=!4v1770731747725!6m8!1m7!1stBdH9t4FbHMXEeOKBcTJLA!2m2!1d-21.12791103592239!2d-51.0968695901712!3f252.94434375824576!4f-12.61044516116111!5f0.7820865974627469" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </MapWrapper>
        </ContainerS>
    );
};