import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Valores from './components/Valores';
import Testimonios from './components/Testimonios';
import ServiciosPages from './pages/ServiciosPages';
import TiendaPages from './pages/TiendaPages';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import RegistroMascotaPage from './pages/RegistroMascotaPage';
import CitasPages from './pages/CitasPages';
import PerfilPage from './pages/PerfilPage';
import AdminPanelPage from './pages/AdminPanelPage';
import ServiciosSeleccionadosPage from './pages/ServiciosSeleccionadosPage';
import logoHero from './assets/Logo Veterinaria San Marco.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export default function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [rolActivo, setRolActivo] = useState(null);
  const [cantidadServicios, setCantidadServicios] = useState(0);
  const [, setUltimoServicio] = useState('');

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

  const handleAgregarProducto = () => {
    setCantidadServicios((prev) => prev + 1);
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
                {/* Sección Hero / Inicio con Logo Veterinaria San Marco */}
                <section id="inicio" className="container my-5">
                  <div className="row align-items-center bg-white p-4 p-md-5 rounded shadow-sm border">
                    <div className="col-md-6">
                      <span className="text-primary fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
                        Atención de Excelencia desde 2009
                      </span>
                      <h1 className="fw-bold my-3" style={{ color: '#0b2545', fontSize: '2.3rem' }}>
                        La salud de tus Mascotas está en nuestras manos profesionales
                      </h1>
                      <p className="text-muted mb-4">
                        Somos especialistas en Perros, Gatos, Conejos y Aves. Además contamos con Consultas, Urgencias y Control de peso para más de 25 pacientes diarios.
                      </p>
                      <div className="d-flex gap-3">
                        <a href="/servicios" className="btn btn-primary px-4 fw-bold">Ver Servicios</a>
                        <a href="/citas" className="btn btn-outline-secondary px-4 fw-bold">Agendar Cita</a>
                      </div>
                    </div>
                    <div className="col-md-6 text-center mt-4 mt-md-0">
                      <img 
                        src={logoHero} 
                        alt="Veterinaria San Marcos - Banner Principal" 
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: '380px', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
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
              />
            }
          />
          <Route
            path="/tienda"
            element={
              <TiendaPages
                onAgregarProducto={handleAgregarProducto}
                cantidadCarrito={cantidadServicios}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/registro-mascota" element={<RegistroMascotaPage />} />
          <Route
            path="/citas"
            element={<CitasPages usuarioActivo={usuarioActivo} />}
          />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route
            path="/carrito-servicios"
            element={<ServiciosSeleccionadosPage />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}