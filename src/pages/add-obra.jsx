import supabase from '../utils/supabase_client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Form, Button, Card, Spinner } from 'react-bootstrap';

// --- ESTILIZAÇÃO (Adicionado Grid para Previews) ---

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 140px; 
  padding-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: transparent;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2); 
  padding: 2.5rem;
  background-color: #ffffff;
`;

const Titulo = styled.h2`
  font-family: "CHANEY", sans-serif;
  font-size: 40px;
  color: #6d070e;
  margin-bottom: 50px;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 400;
  position: relative;
  text-align: center;

  &::after {
    content: "";
    width: 60px;
    height: 3px;
    background-color: #6d070e;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: 768px){
    font-size: 25px;
    word-wrap: break-word;
    line-height: 1.2;
  }
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 15px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #ddd;
`;

const StyledButton = styled(Button)`
  background-color: #6D070E !important;
  border: none !important;
  padding: 14px;
  font-weight: bold;
  margin-top: 10px;
`;

export default function AdicionarObra() {
  const [listaCateg, setListaCateg] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagens, setImagens] = useState([]); // Agora é plural
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]); // Agora é plural

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    const { data, error } = await supabase.from("Categorias").select("nome_categoria");
    if (!error) setListaCateg(data.map(c => c.nome_categoria));
  };

  // FUNÇÃO DE UPLOAD CORRIGIDA
  const uploadImagens = async () => {
    if (imagens.length === 0) return null;

    const gerarSlug = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");

    try {
      const uploadPromises = imagens.map(async (file) => {
        const extensao = file.name.split('.').pop(); // O 'split' agora funciona aqui
        const nomeArquivo = `${gerarSlug(titulo)}-${Math.random().toString(36).substring(7)}.${extensao}`;

        const { error } = await supabase.storage.from("Imagens").upload(nomeArquivo, file);
        if (error) throw error;

        const { data } = supabase.storage.from("Imagens").getPublicUrl(nomeArquivo);
        return data.publicUrl;
      });

      return await Promise.all(uploadPromises); // Retorna array de URLs
    } catch (error) {
      console.error("Erro no storage:", error);
      alert("Erro ao enviar uma ou mais imagens.");
      return null;
    }
  };

  const addObra = async (e) => {
    e.preventDefault();
    
    if (!titulo || !categoria || imagens.length === 0) {
      alert("Por favor, preencha todos os campos e selecione ao menos uma imagem.");
      return;
    }

    setUploading(true);

    try {
      const urls_das_imagens = await uploadImagens();
      
      if (!urls_das_imagens) {
        setUploading(false);
        return;
      }

      // Certifique-se que a coluna img_url no Supabase aceite Array (tipo text[])
      const { error } = await supabase
        .from("ListaObras")
        .insert([{ 
          titulo, 
          categoria, 
          img_url: urls_das_imagens // Enviando o array de URLs
        }]);

      if (error) throw error;

      // Limpar formulário
      setTitulo(""); 
      setCategoria(""); 
      setImagens([]); 
      setPreviewUrls([]);
      
      alert("Obra adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar obra: " + error.message);
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
                placeholder="Adicione um titulo:" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary small">Categoria</Form.Label>
              <Form.Select 
                value={categoria} 
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Selecione uma categoria</option>
                {listaCateg.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold text-secondary small">Imagens da Obra</Form.Label>
              <Form.Control 
                type="file" 
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setImagens(files);
                  const urls = files.map(file => URL.createObjectURL(file));
                  setPreviewUrls(urls); 
                }}
              />
              <PreviewGrid>
                {previewUrls.map((url, index) => (
                  <PreviewImage key={index} src={url} alt={`Preview ${index}`} />
                ))}
              </PreviewGrid>
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