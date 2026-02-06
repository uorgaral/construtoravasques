import "react-photo-album/masonry.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

//fotos específicas:
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
  { src: FachadaComercial, col: "1 / span 2", row: "1 / span 2" },
  { src: FachadaHugo,          col: "3 / span 1", row: "1 / span 1" },
  { src: InteriorExterno,  col: "4 / span 1", row: "1 / span 2" }, 
  { src: MinhaCasaVida,    col: "3 / span 1", row: "2 / span 1" }, 
  { src: Piscina,      col: "1 / span 1", row: "3 / span 2" }, 
  { src: InteriorHugo,     col: "2 / span 1", row: "3 / span 2" }, 
  { src: Liberale,         col: "3 / span 1", row: "3 / span 2" },
  { src: Fachada,          col: "4 / span 1", row: "3 / span 1" },
  { src: Fachada3,         col: "4 / span 1", row: "4 / span 1" }, 
];


const SectionWrapper = styled.section`
  width: 100%;
  height: 100vh;     
  background-color: #2e313d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  overflow: hidden;  
  
  @media (max-width: 768px){
    display: none;
  };
`;

const Titulo = styled.h2`
  font-family: "CHANEY", sans-serif;
  font-size: 32px; 
  color: #f7f7f7;    
  margin-bottom: 30px; 
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 300;
`;

const Galeria = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  grid-auto-rows: 14vh;      
  gap: 15px;    
  width: 85%;
  max-width: 800px;  
  margin: 0 auto;
`;

const Imagens = styled.div`
  overflow: hidden;
  border-radius: 10px;
  grid-column: ${({ col }) => col};
  grid-row: ${({ row }) => row};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.02); 
    }
  }
`;


export default function Montagem() {
  return (
    <SectionWrapper>
      <Titulo>EXCELÊNCIA EM CADA PROJETO</Titulo>
      
      <Galeria>
        {photos.map((img, index) => (
          <Imagens key={index} col={img.col} row={img.row}>
            <img src={img.src} alt={`Projeto ${index + 1}`} />
          </Imagens>
        ))}
      </Galeria>

      <button><Link to="/catalogo">Catálogo Completo</Link></button>
    </SectionWrapper>
  );
}