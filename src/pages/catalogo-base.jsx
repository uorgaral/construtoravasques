import supabase from '../utils/supabase_client';
import { useState, useEffect } from 'react';


export default function Catalogo() {
  const [listaObra, setListaObra] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [img_url, setImg_Url] = useState("");
  const [categoria, setCategoria] = useState("");
  const [editandoId, setEditandoId] = useState(null);


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
      setListaObra((prev) => [...prev, data]);
      setTitulo("");
      setDesc("");
      setImg_Url("");
      setCategoria("");
    }
  }; 


  //READ
  const fetchObras = async () => {
    const {data, error} = await supabase.from("ListaObras").select("*") //sem categorias selecionadas
    if (error) {
      console.log("Erro ao ler as obras.", error)
    } else {
      setListaObra(data)
    }
  }

  useEffect(() => {
    fetchObras();
  }, []);


  //UPDATE
  const editarObra = async (id, titulo, desc, img_url, categoria) => {
  const { data, error } = await supabase
    .from("ListaObras")
    .update({ titulo, desc, img_url, categoria })
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
const deletarObra = async (id) => {
    const { data, error } = await supabase
      .from("ListaObras")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("Erro ao excluir obra: ", error);
    } else {
      setListaObra((prev) => prev.filter((obra) => obra.id !== id));
    }
  };


  

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
  {listaObra.map((obra) => (
    <li key={obra.id} style={{ marginBottom: "20px" }}>
      {editandoId === obra.id ? (
        // MODO EDIÇÃO
        <>
          <input
            value={obra.titulo}
            onChange={(e) =>
              setListaObra((prev) =>
                prev.map((item) =>
                  item.id === obra.id
                    ? { ...item, titulo: e.target.value }
                    : item
                )
              )
            }
          />

          <input
            value={obra.desc}
            onChange={(e) =>
              setListaObra((prev) =>
                prev.map((item) =>
                  item.id === obra.id
                    ? { ...item, desc: e.target.value }
                    : item
                )
              )
            }
          />

          <input
            value={obra.img_url}
            onChange={(e) =>
              setListaObra((prev) =>
                prev.map((item) =>
                  item.id === obra.id
                    ? { ...item, img_url: e.target.value }
                    : item
                )
              )
            }
          />

          <input
            value={obra.categoria}
            onChange={(e) =>
              setListaObra((prev) =>
                prev.map((item) =>
                  item.id === obra.id
                    ? { ...item, categoria: e.target.value }
                    : item
                )
              )
            }
          />

          <button
            onClick={() =>
              editarObra(
                obra.id,
                obra.titulo,
                obra.desc,
                obra.img_url,
                obra.categoria
              )
            }
          >
            Salvar
          </button>

          <button onClick={() => setEditandoId(null)}>
            Cancelar
          </button>
        </>
      ) : (
        // MODO VISUALIZAÇÃO
        <>
          <h1>{obra.titulo}</h1>
          <h2>{obra.categoria}</h2>
          <h3>{obra.desc}</h3>
          <p>{obra.img_url}</p>

          <button onClick={() => setEditandoId(obra.id)}>
            Editar
          </button>
          <button onClick={() => deletarObra(obra.id)}>
            Excluir
          </button>
        </>
      )}
    </li>
  ))}
</ul>
    </>
    </>
  )
}