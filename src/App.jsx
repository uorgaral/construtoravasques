import supabase from './utils/supabase_client.js';
import { useState, useEffect } from 'react';


export default function App() {
  const [obras, setObras] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [img_url, setImg_Url] = useState("");
  const [categoria, setCategoria] = useState("");

//CREATE
  const addObra = async () => {
    const novaObraDados = {
      titulo: titulo,
      desc: desc,
      img_url: img_url,
      categoria: categoria
    }
    const { data, error } = await supabase.from("ListaObras").insert([novaObraDados]).single();

    if (error){
      console.log("Erro ao adicionar nova obra", error)
    } else{
      setObras((prev) => [...prev, data]);
      setNovaObra("");
    }
  }; 


  //READ
  const fetchObras = async () => {
    const {data, error} = await supabase.from("ListaObras").select("*") //sem categorias selecionadas
    if (error) {
      console.log("Erro ao ler as obras.", error)
    } else {
      setObras(data)
    }
  }

  useEffect(() => {
    fetchObras();
  }, []);


  //UPDATE
  const editarObra = async (id, titulo, desc, img_url, categoria) => {
  }
  

  return (
    <>
    <h1>Adicionar Obra</h1>
    <>
    <input type="text" placeholder="Titulo:" onChange={(e) => setTitulo(e.target.value)}/>
    <input type="text" placeholder="Descrição:" onChange={(e) => setDesc(e.target.value)}/>
    <input type="text" placeholder="Imagem:" onChange={(e) => setImg_Url(e.target.value)}/>
    <input type="text" placeholder="Categoria:" onChange={(e) => setCategoria(e.target.value)}/>
    <button onClick={addObra}>Adicionar obra</button>
    </>

    <>
    <ul>
      {obras.map((obra) => (
        <li>
          <h1>{obra.titulo}</h1>
          <h2>{obra.categoria}</h2>
          <h3>{obra.desc}</h3>
          <p>{obra.img_url}</p>

          <button onClick={editarObra(obra.id, obra.titulo, obra.categoria, obra.desc, obra.img_url)}>Editar Obra</button>
          <button>Deletar Obra</button>
        </li>
      ))}
    </ul>
    </>
    </>
  )
}