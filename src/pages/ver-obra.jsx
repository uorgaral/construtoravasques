import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase_client";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

/* ================= HERO (1 imagem) ================= */

const HeroImagem = styled.div`
    width: 100%;
    max-width: 900px;
    height: 520px;
    margin-top: 30px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0,0,0,0.25);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
    }

    &:hover img {
        transform: scale(1.05);
    }

    @media (max-width: 768px){
        height: 350px;
    }
`;

/* ================= GALERIA (2+ imagens) ================= */

const GaleriaGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    width: 100%;
    margin-top: 30px;

    .img-container {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0,0,0,0.12);
    }

    .img-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }

    .img-container:hover img {
        transform: scale(1.06);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

/* ================= ESTRUTURA ================= */

const ContentSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
    align-items: center;
`;

const CustomCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    margin-top: 80px;
`;

const FullPageWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px 20px;
    background-color: #818181;
`;

const Titulo = styled.h2`
  font-family: "CHANEY", sans-serif;
  font-size: 40px;
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

  @media (max-width: 768px){
    font-size: 25px;
    line-height: 1.2;
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
`;

const BackBtn = styled.button`
    background: none;
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    color: #666;
    font-weight: bold;
    margin-top: 30px;
    transition: 0.3s;

    &:hover {
        background: #6D070E;
        color: white;
        border-color: #6D070E;
    }
`;

/* ================= COMPONENTE ================= */

export default function VerObra() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [obra, setObra] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchObra() {
            const { data } = await supabase
                .from("ListaObras")
                .select("*")
                .eq("id", id)
                .single();

            setObra(data);
            setLoading(false);
        }

        fetchObra();
    }, [id]);

    if (loading)
        return (
            <FullPageWrapper>
                <Spinner animation="border" variant="danger" />
            </FullPageWrapper>
        );

    if (!obra)
        return <FullPageWrapper>Obra não encontrada.</FullPageWrapper>;

    const imagens = Array.isArray(obra.img_url)
        ? obra.img_url
        : [obra.img_url];

    const imagemUnica = imagens.length === 1;

    return (
        <FullPageWrapper>
            <CustomCard>
                <ContentSide>
                    <Titulo>{obra.titulo}</Titulo>
                    <Tag>{obra.categoria}</Tag>

                    {imagemUnica ? (
                        <HeroImagem>
                            <img src={imagens[0]} alt={obra.titulo} />
                        </HeroImagem>
                    ) : (
                        <GaleriaGrid>
                            {imagens.map((url, index) => (
                                <div key={index} className="img-container">
                                    <img
                                        src={url}
                                        alt={`${obra.titulo} - ${index}`}
                                    />
                                </div>
                            ))}
                        </GaleriaGrid>
                    )}

                    <BackBtn onClick={() => navigate(-1)}>
                        ← VOLTAR AO CATÁLOGO
                    </BackBtn>
                </ContentSide>
            </CustomCard>
        </FullPageWrapper>
    );
}
