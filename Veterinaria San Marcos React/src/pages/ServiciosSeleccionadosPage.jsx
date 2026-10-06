import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ServiciosSeleccionadosPage() {
  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);
  const usuarioActivo = localStorage.getItem("usuarioLogueado");

  useEffect(() => {
    if (!usuarioActivo) {
      alert("Debes iniciar sesión para ver tus servicios seleccionados.");
      navigate("/login");
      return;
    }

    const guardados = JSON.parse(localStorage.getItem("misServicios")) || [];
    setServicios(guardados);
  }, [usuarioActivo, navigate]);

  const handleEliminarServicio = (indexAEliminar) => {
    const nuevosServicios = servicios.filter((_, index) => index !== indexAEliminar);
    setServicios(nuevosServicios);
    localStorage.setItem("misServicios", JSON.stringify(nuevosServicios));
  };

  const handleConfirmarCitaServicios = () => {
    if (servicios.length === 0) {
      alert("No tienes servicios seleccionados para agendar.");
      return;
    }
    alert("¡Servicios agendados con éxito! Nos pondremos en contacto con los datos de tu mascota.");
    localStorage.removeItem("misServicios");
    setServicios([]);
    navigate("/citas");
  };

  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 style={{ color: '#0b2545' }}>Resumen de Servicios Seleccionados</h2>
          <p className="text-muted m-0">Cliente: <strong>{usuarioActivo || "Invitado"}</strong></p>
        </div>
        <Link to="/servicios" className="btn btn-outline-primary btn-sm">
          ← Agregar más servicios
        </Link>
      </div>

      {servicios.length === 0 ? (
        <div className="alert alert-warning text-center p-5">
          <h4 className="alert-heading">Tu carrito de servicios está vacío</h4>
          <p className="text-muted">Aún no has agregado ningún servicio veterinario para tu mascota.</p>
          <Link to="/servicios" className="btn btn-primary mt-3">Ver Catálogo de Servicios</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <ul className="list-group list-group-flush mb-4">
                  {servicios.map((servicio, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <div>
                        <h5 className="mb-1 text-primary">{servicio.nombre}</h5>
                        <p className="mb-0 text-muted small">{servicio.descripcion || "Atención profesional veterinaria"}</p>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-bold text-success">${servicio.precio || "25.000"}</span>
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleEliminarServicio(index)}
                        >
                          Quitar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <h4 className="m-0 text-dark">Total estimado:</h4>
                  <h3 className="m-0 text-primary fw-bold">
                    ${servicios.reduce((acc, curr) => acc + (Number(curr.precio) || 25000), 0).toLocaleString()}
                  </h3>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button className="btn btn-success btn-lg" onClick={handleConfirmarCitaServicios}>
                    Confirmar y Agendar Cita
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}