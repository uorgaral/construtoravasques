import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home"
import Catalogo from "./pages/catalogo-base";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/catalogo" element={<Catalogo/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;