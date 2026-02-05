import React, { useState } from "react";
import supabase from "../utils/supabase_client";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import styled from "styled-components";

// Mantive o styled-component apenas para o título personalizado e ajustes finos de layout
const StyledCard = styled(Card)`
  max-width: 500px;
  width: 100%;
  margin-top: 50px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Titulo = styled.h2`
  font-family: "Coolvetica", sans-serif;
  font-size: 32px;
  color: #6D070E;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Adicionado para feedback visual
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      navigate("/admin/dashboard");
    }

    setEmail("");
    setSenha("");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <StyledCard className="p-4">
        <Card.Body>
          <Titulo>Login</Titulo>

          {message && <Alert variant="danger">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ex: admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                variant="dark" 
                type="submit" 
                size="md" 
                disabled={loading}
                style={{ backgroundColor: "#6D070E", border: "none" }}
              >
                {loading ? "Carregando..." : "Acessar página de administrador"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </StyledCard>
    </Container>
  );
}