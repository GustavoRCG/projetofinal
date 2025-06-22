import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Header from "./componentes/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cortes from "./pages/Cortes";
import Cadastro from "./pages/Cadastro";
import Barba from "./pages/Barba";
import PrivateRoute from "./componentes/PrivateRoute"; // ⬅️ aqui

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas privadas (agrupadas com Outlet) */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cortes" element={<Cortes />} />
            <Route path="/barba" element={<Barba />} />
          </Route>

          {/* Rota fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
