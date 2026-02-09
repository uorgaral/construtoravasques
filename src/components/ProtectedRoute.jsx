import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../utils/supabase_client';
import { Spinner } from 'react-bootstrap';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Checa a sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuta mudanças na autenticação (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (!session) {
    // Se não houver sessão, manda para o login
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;