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
    }
`
const ContainerDest = styled(Container)`
    && {
        height: auto,
        max-width: 100%;
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1;
        column-gap: 25px;
}
`

const Titulo = styled.h1`
    font-family: "Cold Warm", sans serif;
    font-size: 60px;
    color: #6D070E;
`

const CardTitulo = styled.h1`
    font-family: "Coolvetica", sans serif;
    font-size: 30px;
    color: #ffffff;
`


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
                    <DirectionAwareHover key={item.id} imageUrl={item.img_url}>
                    <CardTitulo>{item.titulo}</CardTitulo>
                    <p className="font-normal text-sm">{item.desc}</p>
                    <button>Ver mais..</button>
                </DirectionAwareHover>
                ))}
            </ContainerDest>
    </ContainerS>
  );
}