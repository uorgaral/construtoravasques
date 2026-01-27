import supabase from '../utils/supabase_client';
import { useState, useEffect } from 'react';

export default function AdicionarObra() {
  const [listaObra, setListaObra] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [categoria, setCategoria] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);




//CREATE
  const addObra = async () => {
  if (!titulo || !desc || !categoria || !imagem) {
    alert("Erro ao adicionar obra, preencha todos os campos");
    return;
  }

  const img_url = await uploadImagem();
  if(!img_url) return;

  const novaObraDados = {
    titulo,
    desc,
    categoria,
    img_url
  };

  const { data, error } = await supabase
    .from("ListaObras")
    .insert([novaObraDados])
    .select()
    .single();

  if (error) {
    alert("Erro ao salvar obra" + error.message);
    return;
  }

  setListaObra((prev) => [data, ...prev]);
  setTitulo("");
  setDesc("");
  setCategoria("");
  setImagem(null);
  setPreviewUrl(null);

  alert("Obra adicionada com sucesso!");
};


const uploadImagem = async () => {
  if (!imagem) {
    alert("Selecione uma imagem.");
    return null;
  }

  const gerarSlug = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const extensao = imagem.name.split('.').pop();
  const nomeArquivo = `${gerarSlug(titulo)}.${extensao}`;


  const {error} = await supabase.storage
    .from("Imagens")
    .upload(nomeArquivo, imagem)

    if(error) {
      alert("Erro ao enviar imagem");
      return null;
    }

  const {data} = supabase.storage
    .from("Imagens")
    .getPublicUrl(nomeArquivo)

  return data.publicUrl
}


  //READ
  const fetchObras = async () => {
    const {data, error} = await supabase
    .from("ListaObras")
    .select("*") //sem categorias selecionadas
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
  // pega o nome do arquivo da URL
  const nomeArquivo = img_url.split("/").pop();

  // remove do bucket
  const { error: erroStorage } = await supabase.storage
    .from("Imagens")
    .remove([nomeArquivo]);

  if (erroStorage) {
    console.log("Erro ao deletar imagem:", erroStorage);
    return;
  }

  // remove do banco
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



  

  return (
    <>
    <h1>Adicionar Obra</h1>
    <>
    <input type="text" value={titulo} placeholder="Titulo:" onChange={(e) => setTitulo(e.target.value)}/>
    <input type="text" value={desc} placeholder="Descrição:" onChange={(e) => setDesc(e.target.value)}/>
    <input type="text" value={categoria} placeholder="Categoria:" onChange={(e) => setCategoria(e.target.value)}/>

    <input 
      type="file" 
      accept="image/png, image/jpeg, image/jpg" 
      onChange={(e) => {
        const file = e.target.files[0];
        setImagem(file);
        setPreviewUrl(URL.createObjectURL(file));
      }}
    />

    {previewUrl && <img src={previewUrl} width="150" />}

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
            onClick={() => {
                editarObra(
                  obra.id,
                  obra.titulo,
                  obra.desc,
                  obra.img_url,
                  obra.categoria
                )

                alert(`Obra salva com sucesso!`)
              }}
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
          <img src={obra.img_url} width="200" />

          <button onClick={() => setEditandoId(obra.id)}>
            Editar
          </button>
          <button onClick={() => deletarObra(obra.id, obra.img_url)}>
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