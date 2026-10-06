import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Valores from './components/Valores';
import Testimonios from './components/Testimonios';
import ServiciosPages from './pages/ServiciosPages';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import RegistroMascotaPage from './pages/RegistroMascotaPage';
import CitasPages from './pages/CitasPages';
import PerfilPage from './pages/PerfilPage';
import AdminPanelPage from './pages/AdminPanelPage';
import ServiciosSeleccionadosPage from './pages/ServiciosSeleccionadosPage';
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
    const guardados = JSON.parse(localStorage.getItem("misServicios")) || [];
    if (usuario) {
      setUsuarioActivo(usuario);
      setRolActivo(rol);
      setCantidadServicios(guardados.length);
    }
  }, []);

  const handleLoginSuccess = (nombre, rol) => {
    setUsuarioActivo(nombre);
    setRolActivo(rol);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("rolLogueado");
    localStorage.removeItem("misServicios");
    setUsuarioActivo(null);
    setRolActivo(null);
    setCantidadServicios(0);
    window.location.href = "/";
  };

  const handleAgregarServicio = (nombreServicio) => {
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
                <Testimonios />
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
          <Route 
            path="/perfil" 
            element={<PerfilPage />} 
          />
          <Route 
            path="/admin" 
            element={<AdminPanelPage />} 
          />
          <Route 
            path="/carrito-servicios" 
            element={<ServiciosSeleccionadosPage />} 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}