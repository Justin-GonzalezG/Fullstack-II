import React, { useEffect, useState } from 'react';

export default function PerfilPage() {
  const [datosUsuario, setDatosUsuario] = useState({});
  const [datosMascota, setDatosMascota] = useState({});

  useEffect(() => {
    const nombre = localStorage.getItem("nombreRegistrado") || localStorage.getItem("usuarioLogueado") || "No especificado";
    const email = localStorage.getItem("emailRegistrado") || "No especificado";
    const rol = localStorage.getItem("rolLogueado") || "Cliente";

    const nombreMascota = localStorage.getItem("nombreMascota") || "Aún no registrada";
    const edadMascota = localStorage.getItem("edadMascota") || "No especificada";
    const razaMascota = localStorage.getItem("razaMascota") || "No especificada";
    const vacunasMascota = localStorage.getItem("vacunasMascota") || "0";

    setDatosUsuario({ nombre, email, rol });
    setDatosMascota({ nombreMascota, edadMascota, razaMascota, vacunasMascota });
  }, []);

  return (
    <section id="perfil-usuario" className="container my-5">
      <h2 className="mb-4 text-center" style={{ color: '#0b2545' }}>Mi Perfil y Mascota</h2>
      
      <div className="row g-4 justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h3 className="card-title h4 mb-3 text-primary">Datos del Propietario</h3>
              <p className="mb-2"><strong>Nombre:</strong> {datosUsuario.nombre}</p>
              <p className="mb-2"><strong>Correo:</strong> {datosUsuario.email}</p>
              <p className="mb-0"><strong>Rol en el Sistema:</strong> <span className="badge bg-secondary">{datosUsuario.rol}</span></p>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm border-0 h-100 border-top border-primary border-4">
            <div className="card-body p-4">
              <h3 className="card-title h4 mb-3 text-primary">Datos de tu Mascota</h3>
              <p className="mb-2"><strong>Nombre:</strong> {datosMascota.nombreMascota}</p>
              <p className="mb-2"><strong>Raza:</strong> {datosMascota.razaMascota}</p>
              <p className="mb-2"><strong>Edad:</strong> {datosMascota.edadMascota}</p>
              <p className="mb-0"><strong>Vacunas al día:</strong> <span className="badge bg-success">{datosMascota.vacunasMascota} / 5</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}