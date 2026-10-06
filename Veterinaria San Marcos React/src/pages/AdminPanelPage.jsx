import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanelPage() {
  const navigate = useNavigate();
  const [rol, setRol] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  
  const [datosCliente, setDatosCliente] = useState({});
  const [datosMascota, setDatosMascota] = useState({});

  useEffect(() => {
    const rolActual = localStorage.getItem("rolLogueado");
    const usuarioActual = localStorage.getItem("usuarioLogueado");

    setRol(rolActual);
    setNombreUsuario(usuarioActual);

    if (rolActual !== "Administrador" && rolActual !== "Trabajador") {
      alert("Acceso denegado. Esta sección es exclusiva para personal autorizado.");
      navigate("/");
    }

    setDatosCliente({
      nombre: localStorage.getItem("nombreRegistrado") || "Sin registro",
      email: localStorage.getItem("emailRegistrado") || "Sin correo",
    });

    setDatosMascota({
      nombre: localStorage.getItem("nombreMascota") || "No registrada",
      raza: localStorage.getItem("razaMascota") || "-",
      edad: localStorage.getItem("edadMascota") || "-",
      vacunas: localStorage.getItem("vacunasMascota") || "0",
    });
  }, [navigate]);

  return (
    <section id="panel-admin" className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 style={{ color: '#0b2545' }}>Panel de Control ({rol})</h2>
          <p className="text-muted m-0">Bienvenido al sistema interno, <strong>{nombreUsuario}</strong>.</p>
        </div>
        <span className="badge bg-danger fs-6 p-2">Modo Restringido</span>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h3 className="card-title h5 text-primary mb-3">Último Cliente Registrado</h3>
              <p className="mb-2"><strong>Nombre:</strong> {datosCliente.nombre}</p>
              <p className="mb-0"><strong>Correo:</strong> {datosCliente.email}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h3 className="card-title h5 text-primary mb-3">Mascota del Cliente</h3>
              <p className="mb-2"><strong>Mascota:</strong> {datosMascota.nombre} ({datosMascota.raza})</p>
              <p className="mb-2"><strong>Edad:</strong> {datosMascota.edad}</p>
              <p className="mb-0"><strong>Vacunas:</strong> <span className="badge bg-success">{datosMascota.vacunas} / 5</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-secondary mt-4 p-4 text-center">
        <h5 className="text-dark fw-bold">Herramientas de Gestión</h5>
        <p className="text-muted mb-0">Aquí el Administrador o Trabajador puede visualizar los registros globales del sistema de la Veterinaria San Marcos.</p>
      </div>
    </section>
  );
}