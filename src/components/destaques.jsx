import { DirectionAwareHover } from "./direction-aware-hover";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import supabase from "../utils/supabase_client";



const ContainerS = styled(Container)`
    && {
        height: auto,
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 90px;
        background-color: #999999;

    @media (max-width: 768px){
    display: none;
  };
};
`
const ContainerDest = styled(Container)`
    && {
        height: auto;
        max-width: 70%; 
        max-height: 500px;
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1;
        column-gap: 25px;
}
`

const Titulo = styled.h2`
  font-family: "Cold Warm", sans-serif;
  font-size: 32px; 
  color: #6D070E;    
  margin-bottom: 30px; 
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 300;
`;

const CardTitulo = styled.h1`
    font-family: "Coolvetica", sans serif;
    font-size: 30px;
    color: #ffffff;
`
const CardWrapper = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 auto;
  
  /* Isso força o componente interno a obedecer o tamanho do wrapper */
  & > div {
    width: 100% !important;
    height: 100% !important;
  }
`;

export default function Destaques() {
    const [destaques, setDestaques] = useState([]);

    useEffect(() => {
        async function buscarDestaques() {
            const {data, error} = await supabase
            .from("ListaObras")
            .select("*")
            .eq("categoria", "Destaques")

            if (error) {
                console.log("Erro ao importar as imagens", error);
                alert("Erro ao importar as imagens")
            } else {
                setDestaques(data);
            }
        }
        buscarDestaques()
    }, [])


  return (
    <ContainerS fluid>
        <Titulo>Destaques</Titulo>
            <ContainerDest>
                {destaques.map((item) => (
                    <CardWrapper key={item.id}>
                    <DirectionAwareHover imageUrl={item.img_url}>
                        <CardTitulo>{item.titulo}</CardTitulo>
                        <p className="font-normal text-sm">{item.desc}</p>
                        <button>Ver mais..</button>
                    </DirectionAwareHover>
                    </CardWrapper>
                ))}
            </ContainerDest>
    </ContainerS>
  );
}