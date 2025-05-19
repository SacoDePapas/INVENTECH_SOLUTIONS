import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Principal from './principal';
import Perfil from './perfil';
import Admin from './admin';
import Enca from './enca';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/enca" element={<Enca />} />
      </Routes>
    </Router>
  );
}

export default App;