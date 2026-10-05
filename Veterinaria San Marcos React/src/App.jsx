import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Valores from './components/Valores';
import ServiciosPages from './pages/ServiciosPages';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import RegistroMascotaPage from './pages/RegistroMascotaPage';
import CitasPages from './pages/CitasPages';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export default function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [rolActivo, setRolActivo] = useState(null);
  const [cantidadServicios, setCantidadServicios] = useState(0);
  const [ultimoServicio, setUltimoServicio] = useState('');

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogueado");
    const rol = localStorage.getItem("rolLogueado");
    if (usuario) {
      setUsuarioActivo(usuario);
      setRolActivo(rol);
    }
  }, []);

  const handleLoginSuccess = (nombre, rol) => {
    setUsuarioActivo(nombre);
    setRolActivo(rol);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("rolLogueado");
    setUsuarioActivo(null);
    setRolActivo(null);
    window.location.href = "/";
  };

  const handleAgregarServicio = (nombreServicio) => {
    if (!localStorage.getItem("usuarioLogueado")) {
      alert("Debes iniciar sesión para seleccionar los Servicios.");
      return;
    }
    setCantidadServicios((prev) => prev + 1);
    setUltimoServicio(nombreServicio);
  };

  return (
    <BrowserRouter>
      <Navbar usuarioActivo={usuarioActivo} rolActivo={rolActivo} onLogout={handleLogout} />
      
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <section id="inicio" className="container my-5 text-center">
                  <h1 className="display-4 fw-bold" style={{ color: '#0b2545' }}>Veterinaria San Marcos</h1>
                  <p className="lead text-muted">Atención Profesional y Cuidado Integral para tu mascota</p>
                </section>
                <Valores />
              </>
            } 
          />
          <Route 
            path="/servicios" 
            element={
              <ServiciosPages 
                onAgregarServicio={handleAgregarServicio} 
                cantidadServicios={cantidadServicios} 
                ultimoServicio={ultimoServicio} 
              />
            } 
          />
          <Route 
            path="/login" 
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />} 
          />
          <Route 
            path="/registro" 
            element={<RegistroPage />} 
          />
          <Route 
            path="/registro-mascota" 
            element={<RegistroMascotaPage />} 
          />
          <Route 
            path="/citas" 
            element={<CitasPages usuarioActivo={usuarioActivo} />} 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}