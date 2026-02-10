import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase_client";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const GaleriaImagens = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
    gap: 20px;
    width: 100%;
    margin-top: 10px;

    /* Container da imagem para manter a proporção */
    .img-container {
        width: 100%;
        aspect-ratio: 1 / 1; /* Quadrado, ou 4/3 para retangular */
        background-color: #f0f0f0; /* Fundo cinza para imagens com proporções diferentes */
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    img {
        width: 100%;
        height: auto; 
        object-fit: contain; 
        transition: transform 0.3s ease;
        border-radius: 8px;
        display: block;
        box-shadow: 0 5px 15px rgba(0,0,0,0.05); 
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
const ContentSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 800px; 
    margin: 0 auto; 
    width: 100%;
`;

const CustomCard = styled.div`
    display: flex;
    flex-direction: column; /* Mudado para column para acomodar melhor a galeria abaixo do título */
    width: 100%;
    max-width: 1100px;
    background: white;
    border-radius: 20px;
    padding: 40px; /* Padding interno em vez de overflow hidden */
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    margin-top: 80px;
    height: auto; /* Deixa o conteúdo definir a altura */
    min-height: 500px;
`;

const FullPageWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Alinha no topo para permitir scroll */
    padding: 40px 20px;
    background-color: #818181;
`;

const Title = styled.h1`
    font-family: "CHANEY", sans-serif;
    font-size: 38px;
    color: #111;
    margin-bottom: 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    line-height: 1.2;

    @media(max-width: 768px){
        font-size: 20px;
    }
`;

const Tag = styled.span`
    background: #f8d7da;
    color: #6D070E;
    padding: 5px 12px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: inline-block;
    width: fit-content;
`;

const BackBtn = styled.button`
    background: none;
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    color: #666;
    font-weight: bold;
    width: fit-content;
    transition: 0.3s;
    margin-top: 15px;

    &:hover {
        background: #6D070E;
        color: white;
        border-color: #6D070E;
    }

    @media(max-width: 768px){
        font-size: 15px;
        padding: 5px 10px;
    }
`;

export default function VerObra() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [obra, setObra] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchObra() {
            const { data } = await supabase.from("ListaObras").select("*").eq("id", id).single();
            setObra(data);
            setLoading(false);
        }
        fetchObra();
    }, [id]);

    if (loading) return <FullPageWrapper><Spinner animation="border" variant="danger" /></FullPageWrapper>;
    if (!obra) return <FullPageWrapper>Obra não encontrada.</FullPageWrapper>;

    return (
        <FullPageWrapper>
            <CustomCard>
                <ContentSide>
                    <Tag>{obra.categoria}</Tag>
                    <Title>{obra.titulo}</Title>

                    <GaleriaImagens>
                        {Array.isArray(obra.img_url) ? (
                            obra.img_url.map((url, index) => (
                                <div key={index}>
                                    <img src={url} alt={`${obra.titulo} - ${index}`} />
                                </div>
                            ))
                        ) : (
                                <img src={obra.img_url} alt={obra.titulo} />
                        )}
                    </GaleriaImagens>
                    
                    <BackBtn onClick={() => navigate(-1)}>← VOLTAR AO CATÁLOGO</BackBtn>
                </ContentSide>
            </CustomCard>
        </FullPageWrapper>
    );
}