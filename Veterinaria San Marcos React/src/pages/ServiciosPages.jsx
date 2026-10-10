import React from 'react';

export default function ServiciosPages({ onAgregarServicio, cantidadServicios, ultimoServicio }) {
  const listaServicios = [
    { id: 1, nombre: "Consulta General", precio: "$15.000", desc: "Evaluación médica completa para revisar el estado general de salud de tu mascota." },
    { id: 2, nombre: "Vacunación y Desparasitación", precio: "$12.000", desc: "Aplicación de vacunas quintuples, sextuples o antirrábicas y desparasitación interna/externa." },
    { id: 3, nombre: "Peluquería y Estética Canina", precio: "$18.000", desc: "Corte de pelo según raza, baño sanitario, limpieza de oídos y corte de uñas." },
    { id: 4, nombre: "Atención de Urgencias 24/7", precio: "$25.000", desc: "Atención médica prioritaria e inmediata ante cualquier accidente o molestia grave." },
    { id: 5, nombre: "Limpieza Dental Ultrasónica", precio: "$30.000", desc: "Profilaxis dental para eliminar sarro, placa bacteriana y prevenir el mal aliento." },
    { id: 6, nombre: "Cirugías y Esterilización", precio: "$45.000", desc: "Procedimientos quirúrgicos seguros con anestesia e instrumental esterilizado." }
  ];

  const handleAgregar = (servicio) => {
    if (!localStorage.getItem("usuarioLogueado")) {
      alert("Debes iniciar sesión para agregar servicios al carrito.");
      return;
    }

    const guardados = JSON.parse(localStorage.getItem("misServicios")) || [];
    const nuevosServicios = [...guardados, servicio];
    localStorage.setItem("misServicios", JSON.stringify(nuevosServicios));

    onAgregarServicio(servicio.nombre);
  };

  return (
    <section className="container my-5">
      <div className="servicios-header d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 style={{ color: '#0b2545', fontWeight: 'bold' }}>Nuestros Servicios Médicos</h2>
          <p className="text-muted m-0">Selecciona los servicios que necesites para agendar tu atención:</p>
        </div>
        <div className="bg-light p-3 rounded border text-center">
          <span className="d-block fw-bold text-secondary">Servicios seleccionados:</span>
          <span className="fs-4 fw-bold text-primary">{cantidadServicios}</span>
        </div>
      </div>

      {ultimoServicio && (
        <div className="alert alert-success py-2 mb-4 text-center">
          ¡<strong>{ultimoServicio}</strong> fue agregado al carrito exitosamente!
        </div>
      )}

      <div className="servicios-grid">
        {listaServicios.map((s) => (
          <div key={s.id} className="tarjeta-servicio">
            <div>
              <h3>{s.nombre}</h3>
              <p>{s.desc}</p>
            </div>
            <div>
              <span className="precio">{s.precio}</span>
              <button 
                className="btn btn-primary w-100 mt-3"
                onClick={() => handleAgregar(s)}
              >
                Agregar Servicio
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}