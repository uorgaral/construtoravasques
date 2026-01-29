import supabase from '../utils/supabase_client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';


const ContainerS = styled(Container)`
    && {
        min-height: 100vh; 
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        gap: 40px;
    }
`

const Titulo = styled.h1`
    font-family: "Cold Warm", sans serif;
    font-size: 60px;
    color: #6D070E;
`


export default function Catalogo() {
  const [listaObra, setListaObra] = useState([]);

const fetchCategorias = async () =>{
  const {data, error} = await supabase 
  .from("Categorias")
  .select("nome_categoria")
  if (error) {
    console.log("Erro ao buscar categorias.", error)
    alert("Erro ao buscar categorias.")
  } else {
    setListaCateg(data.map(c => c.nome_categoria));
    console.log(data)
  }
}
useEffect(() => {
  fetchCategorias();
}, []);

const fetchObras = async () => {
    const {data, error} = await supabase
    .from("ListaObras")
    .select("*")
    if (error) {
      console.log("Erro ao buscar as obras.", error)
      alert("Erro ao buscar as obras.")
    } else {
      setListaObra(data)
    }
  }
  useEffect(() => {
    fetchObras();
  }, []);

  return (
    <ContainerS fluid>
        <Titulo>Catalogo</Titulo>
            <Row className='gy-4'>
                {listaObra.map((obra) => (
                    <Col key={obra.id} xs={12} md={6} lg={4} xl={3} className="d-flex justify-content-center">
                            <Card key={obra.id} style={{ width: '18rem' }}>
                            <Card.Img src={obra.img_url}/>
                            <Card.Body>
                                <Card.Title>{obra.titulo}</Card.Title>
                                <Card.Text>
                                {obra.desc}
                                </Card.Text>
                                <Button variant="primary">x</Button>
                            </Card.Body>
                            </Card>
                    </Col>
                ))}
            </Row>
    </ContainerS>
);
}

//UPDATE
  const editarObra = async (id, titulo, desc, categoria, img_url) => {
  const { data, error } = await supabase
    .from("ListaObras")
    .update({ titulo, desc, categoria, img_url })
    .eq("id", id)
    .select()
    .single();


  if (error) {
    console.log("Erro ao alterar obra.", error);
  } else {
    setListaObra((prev) =>
      prev.map((item) => (item.id === id ? data : item))
    );
    setEditandoId(null);
  }
};

//DELETE
const deletarObra = async (id, img_url) => {
  const nomeArquivo = img_url.split("/").pop();
  const { error: erroStorage } = await supabase.storage
    .from("Imagens")
    .remove([nomeArquivo]);

  if (erroStorage) {
    console.log("Erro ao deletar imagem:", erroStorage);
    return;
  }

const { error } = await supabase
    .from("ListaObras")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Erro ao excluir obra: ", error);
  } else {
    setListaObra((prev) => prev.filter((obra) => obra.id !== id));
  }
};