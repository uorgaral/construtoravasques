import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import supabase from '../utils/supabase_client';



export default function Carrossel(){
    const [obras, setObras] = useState([]);

    useEffect(() => {
        async function buscarImagens() {
            const {data, error} = await supabase
                .from("carrossel")
                .select('*');

            if (error) {
                console.error(error);
            } else {
                setObras(data);
            }
        }

        buscarImagens();
    }, []);


    return(
        <Carousel>
            {obras.map((item) => (
                <Carousel.Item key={item.id}>
                    <img
                    className="d-block w-100"
                    src={item.imagem_url}
                    alt={item.titulo}
                    />
                    <Carousel.Caption>
                    <h5>{item.titulo}</h5>
                    <p>{item.desc}</p>
                </Carousel.Caption>
        </Carousel.Item>
            ))}
        </Carousel>
    );
}