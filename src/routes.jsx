import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/home"
import AdicionarObra from "./pages/add-obra";
import Login from "./pages/admin";
import Dashboard from "./pages/dashboard";
import Catalogo from "./pages/catalogo";
import CatalogoAdm from "./pages/catalogo-adm";
import VerObra from "./pages/ver-obra"
import AlterarObra from "./pages/alterar-obra"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo/>}/>
      <Route path="/obra/:id" element={<VerObra/>}/>
      <Route path="/admin" element={<Login />}/>


      
      <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      <Route path="/admin/catalogo_adm" element={<ProtectedRoute><CatalogoAdm /></ProtectedRoute>}/>
      <Route path="/admin/adicionar_obra" element={<ProtectedRoute><AdicionarObra /></ProtectedRoute>} />
      <Route path="/admin/obra_alterar/:id" element={<ProtectedRoute><AlterarObra /></ProtectedRoute>}/>
    </Routes>
  );
};

export default AppRoutes;
