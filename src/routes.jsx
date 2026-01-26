import { Routes, Route } from "react-router-dom";

import Home from "./pages/home"
import AdicionarObra from "./pages/add-obra";
import Login from "./pages/admin";
import Dashboard from "./pages/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo"/>
      <Route path="/admin" element={<Login />}/>
      <Route path="/admin/dashboard" element={<Dashboard />}/>
      <Route path="/admin/alterar_obra"/>
      <Route path="/admin/adicionar_obra" element={<AdicionarObra />} />
    </Routes>
  );
};

export default AppRoutes;
