import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import supabase from '../utils/supabase_client'

const ContainerS = styled(Container)`
  padding-top: 100px;
  padding-bottom: 20px;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const ScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
  padding-bottom: 15px;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardContainer = styled.div`
  min-width: 85%;
  scroll-snap-align: center; 
`;

const TitCard = styled.h3`
  color: black;
  font-family: "Coolvetica", sans-serif;
`;



export default function ImagemMobile() {
  const [listaObras, setListaObras] = useState([]);

  useEffect(() => {
    async function buscarObras() {
      const { data, error } = await supabase
        .from("ListaObras")
        .select("*")
        .eq("categoria", "Destaques");

      if (error) {
        console.log(error);
        alert("Erro ao importar imagens");
      } else {
        setListaObras(data);
      }
    }
    buscarObras();
  }, []);

  return (
    <ContainerS>
      <ScrollWrapper>
        {listaObras.map((item, index) =>(
          <CardContainer key={index}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <img src={item.img_url}/>
              <div style={{width: "85%", backgroundColor: "white", padding: 10}}>
                <TitCard>{item.titulo}</TitCard>
                <Link to={`/obra/${item.id}`}>Detalhes</Link>
              </div>
            </div>
            
          </CardContainer>
        ))}
      </ScrollWrapper>
    </ContainerS>
  );
}
