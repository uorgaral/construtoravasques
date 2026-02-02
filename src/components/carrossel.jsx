import { useState, useEffect } from 'react';
import supabase from '../utils/supabase_client';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel'


const CarrosselS = styled(Carousel)`
    transition: 0.2s ease;
    width: 100vw !important;
    height: 100vh !important;

    .carousel-inner, .carousel-item{
        height: 100%
    }

    img {
        object-fit: cover;
        width: 100vw !important;
        height: 100vh !important;
    }

    @media (max-width: 768px){
    display: none;
  };
`


export default function Carrossel(){
    const [obras, setObras] = useState([]);

    useEffect(() => {
        async function buscarImagens() {
            const {data, error} = await supabase
                .from("ListaObras")
                .select("*");

            if (error) {
                console.log("Erro ao importar as imagens", error);
                alert("Erro ao importar as imagens")
            } else {
                setObras(data);
            }
        }

        buscarImagens();
    }, []);


    return(
        <CarrosselS>
            {obras.map((item) => (
                <Carousel.Item key={item.id}>
                    <img
                    className="d-block w-100"
                    src={item.img_url}
                    />
        </Carousel.Item>
            ))}
        </CarrosselS>
    );
}