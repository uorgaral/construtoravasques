import { useState, useEffect } from 'react';
import supabase from '../utils/supabase_client';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';


const CarrosselS = styled(Carousel)`
    transition: 0.2s ease;
    width: 100vw !important;
    height: 100vh !important;
    position: relative;

    img {
        object-fit: cover;
        width: 100vw !important;
        height: 100vh !important;
    }

    @media (max-width: 768px){
        display: none !important
    };
`


export default function Carrossel(){
    const [obras, setObras] = useState([]);

    useEffect(() => {
        async function buscarImagens() {
            // Adicionamos o filtro .neq para excluir a categoria Destaques
            const {data, error} = await supabase
                .from("ListaObras")
                .select("*")
                .neq("categoria", "Destaques"); 

            if (error) {
                console.log("Erro ao importar as imagens", error);
            } else {
                setObras(data);
            }
        }

        buscarImagens();
    }, []);

    return(
        <CarrosselS fluid>
            {obras.map((item) => (
                <Carousel.Item key={item.id}>
                    <img
                        className="d-block w-100"
                        src={Array.isArray(item.img_url) ? item.img_url[0] : item.img_url}
                        alt={item.titulo}
                    />
                </Carousel.Item>
            ))}
        </CarrosselS>
    );
}