import supabase from '../utils/supabase_client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Form, Button, Card, Spinner } from 'react-bootstrap';
import Select from 'react-select';

// --- ESTILIZAÇÃO ---

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 140px; 
  padding-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinha ao topo para evitar saltos de layout */
  background-color: transparent; /* Permite ver o fundo cinza do body */

  @media (max-width: 768px) {
    padding-top: 100px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2); 
  padding: 2.5rem;
  background-color: #ffffff;

  @media (max-width: 576px) {
    padding: 1.5rem;
    border-radius: 15px;
  }
`;

const Titulo = styled.h1`
  font-family: "CHANEY", sans-serif;
  color: #6D070E;
  font-size: 1.8rem;
  letter-spacing: 1px;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 350px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 15px;
  border: 1px solid #ddd;
`;

const StyledButton = styled(Button)`
  background-color: #6D070E !important;
  border: none !important;
  padding: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #4a050a !important;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(109, 7, 14, 0.3);
  }

  &:disabled {
    background-color: #cccccc !important;
  }
`;


export default function AdicionarObra() {
  const [listaObra, setListaObra] = useState([]);
  const [listaCateg, setListaCateg] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]); 

  useEffect(() => {
    fetchCategorias();
    fetchObras();
  }, []);

  const fetchCategorias = async () => {
    const { data, error } = await supabase.from("Categorias").select("nome_categoria");
    if (!error) setListaCateg(data.map(c => c.nome_categoria));
  };

  const fetchObras = async () => {
    const { data, error } = await supabase.from("ListaObras").select("*");
    if (!error) setListaObra(data);
  };

  const uploadImagem = async () => {
    if (!imagem) return null;

    const gerarSlug = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");
    const extensao = imagem.name.split('.').pop();
    const nomeArquivo = `${gerarSlug(titulo)}-${Date.now()}.${extensao}`;

    const { error } = await supabase.storage.from("Imagens").upload(nomeArquivo, imagem);
    
    if (error) {
      console.error("Erro no storage:", error);
      alert("Erro ao enviar a imagem.");
      return null;
    }

    const { data } = supabase.storage.from("Imagens").getPublicUrl(nomeArquivo);
    return data.publicUrl;
  };

        const addObra = async (e) => {
        e.preventDefault();
        
        if (!titulo || !desc || categoriasSelecionadas.length === 0 || !imagem) {
          alert("Por favor, preencha todos os campos.");
          return;
        }

        setUploading(true);

        try {
          const img_url = await uploadImagem();
          if (!img_url) return;

          // Converte o array ["A", "B"] em "A, B" para salvar no banco
          const categoriasParaBanco = categoriasSelecionadas.join(", ");

          const { data, error } = await supabase
            .from("ListaObras")
            .insert([{ 
              titulo, 
              desc, 
              categoria: categoriasParaBanco, // Enviando a string formatada
              img_url 
            }])
            .select()
            .single();

          if (error) throw error;

          // Resetar campos
          setCategoriasSelecionadas([]);
          // ... restante do seu código de limpeza
          alert("Obra adicionada com sucesso!");
        } catch (error) {
          console.error(error);
        } finally {
          setUploading(false);
        }
      };
  return (
    <PageWrapper>
      <Container className="d-flex justify-content-center">
        <StyledCard>
          <Titulo>Adicionar Obra</Titulo>
          
          <Form onSubmit={addObra}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary small">Título da Obra</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Insira o título" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary small">Descrição</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Insira uma descrição breve" 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)} 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary small">Categorias (Segure Ctrl para selecionar várias)</Form.Label>
              <Select
                isMulti
                options={listaCateg.map(cat => ({ value: cat, label: cat }))}
                onChange={(selected) => setCategoriasSelecionadas(selected.map(s => s.value))}
                placeholder="Selecione as categorias..."
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold text-secondary small">Imagem da Obra</Form.Label>
              <Form.Control 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if(file) {
                    setImagem(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }} 
              />
              {previewUrl && <PreviewImage src={previewUrl} alt="Preview" />}
            </Form.Group>

            <StyledButton type="submit" className="w-100" disabled={uploading}>
              {uploading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  SALVANDO...
                </>
              ) : "SALVAR OBRA"}
            </StyledButton>
          </Form>
        </StyledCard>
      </Container>
    </PageWrapper>
  );
}