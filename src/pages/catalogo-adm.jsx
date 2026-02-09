import React, { useState, useEffect } from "react";
import styled from "styled-components";
import supabase from '../utils/supabase_client';
import { Container, Row, Col, Stack, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// --- Styled Components ---

const ContainerS = styled(Container)`
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100%; /* Garante que ocupe a largura disponível */
    background-color: #818181; /* Garante que o fundo do container cubra tudo */
`;

const GridObras = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  gap: 30px;
  justify-content: center;
  margin-top: 40px;
  width: 100%; 
  repeat(auto-fit);
  justify-content: center; 
  align-content: center; 
  margin: 40px auto 0 auto;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 300px);
  }

 @media (max-width: 768px) {
    display: grid;
    gap: 10px;
    width: 100%; 
    grid-template-columns: repeat(2, 1fr);
    max-width: 360px;
  }
}
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


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 2;
  padding: 20px;
  border-radius: 12px;
`;

const NomeObra = styled.h3`
  color: white;
  font-family: "CHANEY", sans-serif;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 15px;
  transform: translateY(20px);
  transition: transform 0.4s ease;
  width: 90%;
  
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limita a no máximo 3 linhas */
  -webkit-box-orient: vertical;
  overflow: hidden; /* Esconde o que passar de 3 linhas */
  text-overflow: ellipsis; /* Adiciona os "..." */
  word-wrap: break-word; /* Força a quebra de palavras muito longas */
  line-height: 1.2; /* Ajusta o espaçamento entre linhas para não cortar letras */
`;

const BotaoVerMais = styled(Link)`
  background-color: #6D070E;
  color: white !important;
  padding: 8px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.8rem;
  letter-spacing: 1px;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    background-color: #9c0a14;
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  aspect-ratio: 4 / 5; 
  width: 300px;
  height: 350px;
  position: relative; 
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  @media (max-width: 768px) {
    flex-shrink: 0; 
    width: 170px;
    height: 220px;
    margin: 0 10px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    display: block;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);

    img {
      transform: scale(1.1);
    }

    ${Overlay} {
      opacity: 1;
    }

    ${NomeObra} {
      transform: translateY(0);
    }
  }
`;

const AdminBtn = styled(Link)`
    text-decoration: none;
    background-color: #212529;
    color: white;
    padding: 7px 15px;
    border-radius: 5px;
    font-size: 14px;
    transition: 0.3s;
    &:hover {
        background-color: #000;
        color: white;
    }
`;

// --- Componente Principal ---

export default function CatalogoAdm() {
  const [imagens, setImagens] = useState([]);
  const [categoria, setCategoria] = useState("Geral");

  useEffect(() => {
    async function buscarObras() {
      let query = supabase.from("ListaObras").select("*");
      if (categoria !== "Geral") {
        query = query.eq("categoria", categoria);
      }
      const { data, error } = await query;
      if (error) {
        console.error("Erro Supabase:", error);
      } else {
        setImagens(data);
      }
    }
    buscarObras();
  }, [categoria]);

  const getBtnClass = (nome) => {
    return categoria === nome ? "btn btn-danger" : "btn btn-outline-danger";
  };

  return (
    <ContainerS fluid>
      <Titulo>Visão do Catálogo</Titulo>

      <Stack direction="horizontal" gap={2} className="justify-content-center flex-wrap">
        <button className={getBtnClass("Geral")} onClick={() => setCategoria("Geral")}>Geral</button>
        <button className={getBtnClass("Residencial")} onClick={() => setCategoria("Residencial")}>Residencial</button>
        <button className={getBtnClass("Comercial")} onClick={() => setCategoria("Comercial")}>Comercial</button>
        <button className={getBtnClass("Reforma")} onClick={() => setCategoria("Reforma")}>Reforma</button>
        <AdminBtn to="/admin/adicionar_obra">Adicionar Obra</AdminBtn>
      </Stack>

      <GridObras>
        {imagens.length > 0 ? (
          imagens.map((item) => (
            <ImageWrapper key={item.id}>
              <Image src={item.img_url} alt={item.titulo || "Obra"} />
              <Overlay>
                <NomeObra>{item.titulo || "Obra sem título"}</NomeObra>
                <BotaoVerMais to={`/obra/${item.id}`}>
                  VER DETALHES
                </BotaoVerMais>
                <BotaoVerMais to={`/admin/obra_alterar/${item.id}`}>
                  EDITAR OBRA
                </BotaoVerMais>
              </Overlay>
            </ImageWrapper>
          ))
        ) : (
          <div className="text-center mt-5">
            <p>Nenhuma obra encontrada.</p>
          </div>
        )}
      </GridObras>
    </ContainerS>
  );
}