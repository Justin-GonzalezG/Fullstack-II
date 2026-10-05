import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ usuarioActivo, rolActivo, onLogout }) {
  return (
    <header className="header-principal">
      <div className="logo-container">
        <h2 id="titulo-sitio" className="m-0 fs-4" style={{ color: '#0b2545' }}>
          Veterinaria San Marcos
        </h2>
      </div>

      <nav className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/citas">Citas</Link>
      </nav>

      <div className="auth-boton">
        {usuarioActivo ? (
          <div className="d-flex align-items-center gap-3">
            <span className="fw-bold text-primary">
              Hola, {usuarioActivo} <small className="text-muted">({rolActivo})</small>
            </span>
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={onLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-primary btn-sm px-3">Iniciar Sesión</Link>
            <Link to="/registro" className="btn btn-primary btn-sm px-3">Registro</Link>
          </div>
        )}
      </div>
    </header>
  );
}