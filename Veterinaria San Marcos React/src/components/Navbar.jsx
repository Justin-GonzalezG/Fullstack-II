import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoVSM from '../assets/VSM.png';

export default function Navbar({ usuarioActivo, rolActivo, onLogout }) {
  const esPersonalAutorizado = rolActivo === "Administrador" || rolActivo === "Trabajador";
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("misServicios")) || [];
    setCantidadCarrito(guardados.length);
  }, [usuarioActivo]);

  return (
    <header className="header-principal">
      <div className="logo-container">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <img 
            src={logoVSM} 
            alt="Veterinaria San Marcos" 
            style={{ height: '100px', objectFit: 'contain' }} 
          />
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/tienda">Tienda</Link>
        <Link to="/citas">Citas</Link>
        {usuarioActivo && <Link to="/perfil">Mi Perfil</Link>}
        {usuarioActivo && (
          <Link to="/carrito-servicios" className="position-relative">
            Carrito <span className="badge bg-primary rounded-pill ms-1">{cantidadCarrito}</span>
          </Link>
        )}
        {esPersonalAutorizado && <Link to="/admin" className="text-danger fw-bold">Panel Admin</Link>}
      </nav>

      <div className="auth-boton">
        {usuarioActivo ? (
          <div className="d-flex align-items-center gap-3">
            <span className="fw-bold" style={{ color: '#0b2545' }}>
              Hola, {usuarioActivo} <small className="text-muted">({rolActivo})</small>
            </span>
            <button 
              className="btn btn-outline-danger btn-sm fw-bold px-3"
              onClick={onLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-primary btn-sm px-3 fw-bold">Iniciar Sesión</Link>
            <Link to="/registro" className="btn btn-primary btn-sm px-3 fw-bold">Registro</Link>
          </div>
        )}
      </div>
    </header>
  );
}