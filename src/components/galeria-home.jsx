import "react-photo-album/masonry.css";
import styled from "styled-components";
import { MasonryPhotoAlbum } from "react-photo-album";

//fotos específicas:
import Piscina from '../assets/ImagensHomeGaleria/Piscina.png'
import MinhaCasaVida from '../assets/ImagensHomeGaleria/MinhaCasaVida.png'
import Liberale from '../assets/ImagensHomeGaleria/Liberale.png'
import InteriorHugo from '../assets/ImagensHomeGaleria/InteriorHugo.jpeg'
import InteriorExterno from '../assets/ImagensHomeGaleria/InteriorExterno.png'
import FachadaHugo from '../assets/ImagensHomeGaleria/FachadaHugo.jpeg'
import Fachada from '../assets/ImagensHomeGaleria/Fachada.png'
import Fachada2 from '../assets/ImagensHomeGaleria/Fachada2.png'
import Fachada3 from '../assets/ImagensHomeGaleria/Fachada3.jpg'
import FachadaComercial from '../assets/ImagensHomeGaleria/FachadaComercial.png'



const photos = [
    { src: Piscina, width: 259.64, height: 171.6 },
    { src: MinhaCasaVida, width: 269.15, height: 232.63 },
    { src: Liberale, width: 220.11, height: 265.04 },
    { src: InteriorHugo, width: 282.53, height: 142.67 },
    { src: InteriorExterno, width: 418.67, height: 238.98 },
    { src: FachadaHugo, width: 240.78, height: 232.69 },
    { src: FachadaComercial, width: 353.08, height: 265.93 },
    { src: Fachada, width: 288.39, height: 170.7 },
    { src: Fachada3, width: 282.53, height: 142.67 }
];



export default function Montagem() {
  return(
        <div style={{width: "100%", height: "auto", backgroundColor: "#292C37", padding: "80px", display: "flex", flexDirection: "column"}}>
            <h1>Excelência em cada projeto!</h1>
            <MasonryPhotoAlbum  photos={photos}/>
        </div>
  ) 
}