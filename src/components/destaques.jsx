import styled from "styled-components";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import supabase from "../utils/supabase_client";

const SectionWrapper = styled.section`
  width: 100%;
  padding: 60px 0; // Removi o padding lateral no mobile para a imagem encostar na borda ao scrollar
  background-color: #999;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden; // Evita quebra de layout lateral
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

const ScrollContainer = styled.div`
  display: flex; // Mudamos de Grid para Flex para facilitar o scroll horizontal
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px 20px 20px; // Padding interno para o efeito de sombra não cortar

  /* Lógica de Scroll Mobile */
  @media (max-width: 768px) {
    overflow-x: auto; // Habilita o scroll horizontal
    scroll-snap-type: x mandatory; // Faz a imagem "travar" no centro ao soltar
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none; // Esconde a barra de rolagem para um visual mais limpo
    }
  }

  /* Desktop: Volta a se comportar como Grid */
  @media (min-width: 769px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 auto;
  }
`;

const ImageWrapper = styled.div`
  min-width: 85%; // No mobile, cada card ocupa 85% da tela (mostra um pedaço do próximo)
  scroll-snap-align: center; // Centraliza o card ao arrastar
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  aspect-ratio: 4 / 5;
  transition: transform 0.3s ease;

  @media (min-width: 769px) {
    min-width: auto;
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

export default function Destaques() {
  const [destaques, setDestaques] = useState([]);

  useEffect(() => {
    async function buscarDestaques() {
      const { data, error } = await supabase
        .from("ListaObras")
        .select("*")
        .eq("categoria", "Destaques");

      if (error) {
        console.error("Erro ao importar as imagens", error);
      } else {
        setDestaques(data);
      }
    }
    buscarDestaques();
  }, []);

  return (
    <SectionWrapper>
      <Titulo>Destaques</Titulo>
      <ScrollContainer>
        {destaques.map((item) => (
          <ImageWrapper key={item.id}>
            <Image
              src={item.img_url}
              alt="Obra em destaque"
              loading="lazy"
            />
          </ImageWrapper>
        ))}
      </ScrollContainer>
    </SectionWrapper>
  );
}