import { Routes, Route } from "react-router-dom";

import Home from "./pages/home"
import Catalogo from "./pages/catalogo-base";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
    </Routes>
  );
};

export default AppRoutes;
