import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase_client";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";


const FullPageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px;
    box-sizing: border-box;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
`;

const CustomCard = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1100px;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    min-height: 500px;
    margin-top: 80px;

    @media (max-width: 850px) {
        flex-direction: column;
        max-width: 500px;
    }
`;

const ImageSide = styled.div`
    flex: 1; /* Ocupa 50% */
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    min-height: 400px;
`;


const ContentSide = styled.div`
    flex: 1;
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    /* Adicionado para garantir que o conteúdo longo não force a largura do flex */
    min-width: 0; 

    @media (max-width: 850px) {
        padding: 30px;
    }
`;

const Title = styled.h1`
    font-family: "CHANEY", sans-serif;
    font-size: 38px;
    color: #111;
    margin-bottom: 20px;
    /* Ajustes para texto longo */
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    line-height: 1.2;
`;

const Text = styled.p`
    color: #555;
    line-height: 1.6;
    font-size: 18px;
    margin-bottom: 40px;
    /* Ajustes para texto longo */
    word-wrap: break-word;
    white-space: pre-wrap; /* Preserva quebras de linha do banco de dados */
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

    &:hover {
        background: #6D070E;
        color: white;
        border-color: #6D070E;
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
                <ImageSide src={obra.img_url} />
                <ContentSide>
                    <Tag>{obra.categoria}</Tag>
                    <Title>{obra.titulo}</Title>
                    <BackBtn onClick={() => navigate(-1)}>← VOLTAR AO CATÁLOGO</BackBtn>
                </ContentSide>
            </CustomCard>
        </FullPageWrapper>
    );
}