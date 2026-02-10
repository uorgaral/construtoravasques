import supabase from '../utils/supabase_client';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Form, Button, Card, Spinner, Modal } from 'react-bootstrap';

// --- ESTILIZAÇÃO ---

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

const Titulo = styled.h1`
  font-family: "CHANEY", sans-serif;
  color: #6D070E;
  font-size: 1.8rem;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 2rem;
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
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #4a050a !important;
    transform: translateY(-2px);
  }
`;

const DeleteButton = styled(Button)`
  background-color: transparent !important;
  border: 2px solid #dc3545 !important;
  color: #dc3545 !important;
  padding: 10px;
  font-weight: bold;
  width: 100%;
  margin-top: 20px;
  transition: 0.3s;

  &:hover {
    background-color: #dc3545 !important;
    color: white !important;
  }
`;

// --- COMPONENTE PRINCIPAL ---

export default function AlterarObra() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [listaCateg, setListaCateg] = useState([]);
  const [imagem, setImagem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Estado para o Modal de Confirmação
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategorias();
    fetchDadosObra();
  }, [id]);

  const fetchCategorias = async () => {
    const { data } = await supabase.from("Categorias").select("nome_categoria");
    if (data) setListaCateg(data.map(c => c.nome_categoria));
  };

  const fetchDadosObra = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("ListaObras")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert("Erro ao carregar obra!");
      navigate("/admin/catalogo_adm");
    } else {
      setTitulo(data.titulo);
      setCategoria(data.categoria);
      setPreviewUrl(data.img_url);
    }
    setLoading(false);
  };

  // FUNÇÃO PARA EXCLUIR
  const excluirObra = async () => {
    setUploading(true);
    try {
      const { error } = await supabase
        .from("ListaObras")
        .delete()
        .eq("id", id);

      if (error) throw error;

      alert("Obra excluída com sucesso!");
      navigate("/admin/catalogo_adm");
    } catch (error) {
      alert("Erro ao excluir: " + error.message);
    } finally {
      setUploading(false);
      setShowModal(false);
    }
  };

  const uploadImagem = async () => {
    if (!imagem) return previewUrl;
    const gerarSlug = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");
    const extensao = imagem.name.split('.').pop();
    const nomeArquivo = `${gerarSlug(titulo)}-${Date.now()}.${extensao}`;

    const { error } = await supabase.storage.from("Imagens").upload(nomeArquivo, imagem);
    if (error) return null;

    const { data } = supabase.storage.from("Imagens").getPublicUrl(nomeArquivo);
    return data.publicUrl;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const img_url = await uploadImagem();
      const { error } = await supabase
        .from("ListaObras")
        .update({ titulo, categoria, img_url })
        .eq("id", id);

      if (error) throw error;
      alert("Obra atualizada!");
      navigate("/admin/catalogo_adm");
    } catch (error) {
      alert("Erro: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <PageWrapper><Spinner animation="border" variant="danger" /></PageWrapper>;

  return (
    <PageWrapper>
      <Container className="d-flex justify-content-center">
        <StyledCard>
          <Titulo>Alterar Obra</Titulo>
          
          <Form onSubmit={handleUpdate}>
            {/* Campos de formulário idênticos aos anteriores */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary small">Título</Form.Label>
              <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary small">Categoria</Form.Label>
              <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                {listaCateg.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold text-secondary small">Imagem</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files[0];
                if(file) { setImagem(file); setPreviewUrl(URL.createObjectURL(file)); }
              }} />
              {previewUrl && <PreviewImage src={previewUrl} />}
            </Form.Group>

            <StyledButton type="submit" disabled={uploading}>
              {uploading ? "SALVANDO..." : "ATUALIZAR PROJETO"}
            </StyledButton>
          </Form>

          <hr className="mt-4" />
          
          {/* BOTÃO DE EXCLUIR */}
          <DeleteButton onClick={() => setShowModal(true)} disabled={uploading}>
            EXCLUIR OBRA DEFINITIVAMENTE
          </DeleteButton>

          <Button variant="link" className="w-100 mt-2 text-secondary" onClick={() => navigate("/admin/catalogo_adm")}>
            Voltar
          </Button>
        </StyledCard>
      </Container>

      {/* MODAL DE CONFIRMAÇÃO (Segurança para não apagar sem querer) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir "<strong>{titulo}</strong>"? Esta ação não pode ser desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={excluirObra}>Sim, Excluir</Button>
        </Modal.Footer>
      </Modal>

    </PageWrapper>
  );
}