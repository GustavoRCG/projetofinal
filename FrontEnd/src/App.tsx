import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Header from "./componentes/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cortes from "./pages/Cortes";
import Cadastro from "./pages/Cadastro";
import Barba from "./pages/Barba";

// rotas de navegação do site
function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cortes" element={<Cortes />} />
          <Route path="/Barba" element={<Barba />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
