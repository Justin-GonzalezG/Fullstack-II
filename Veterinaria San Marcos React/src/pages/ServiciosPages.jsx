import React from 'react';

export default function ServiciosPages({ onAgregarServicio, cantidadServicios, ultimoServicio }) {
  const listaServicios = [
    { id: 1, nombre: "Consulta General", precio: "$15.000", desc: "Evaluación médica completa de tu mascota." },
    { id: 2, nombre: "Vacunación", precio: "$20.000", desc: "Aplicación de vacunas al día y carnet sanitario." },
    { id: 3, nombre: "Desparasitación", precio: "$12.000", desc: "Control interno y externo de parásitos." },
    { id: 4, nombre: "Peluquería Canina", precio: "$25.000", desc: "Baño, corte de pelo y aseo general." },
    { id: 5, nombre: "Radiografía Veterinaria", precio: "$35.000", desc: "Estudio de diagnóstico por imágenes de alta precisión." },
    { id: 6, nombre: "Cirugía General", precio: "$80.000", desc: "Pabellón equipado y monitoreo constante para cirugías." }
  ];

  const handleAgregarAlCarrito = (servicio) => {
    if (!localStorage.getItem("usuarioLogueado")) {
      alert("Debes iniciar sesión para seleccionar los Servicios.");
      return;
    }

    // Obtener los servicios previos del localStorage y añadir el nuevo
    const serviciosActuales = JSON.parse(localStorage.getItem("misServicios")) || [];
    const nuevosServicios = [...serviciosActuales, servicio];
    localStorage.setItem("misServicios", JSON.stringify(nuevosServicios));

    // Ejecutar la función que viene por props para actualizar contadores en App
    onAgregarServicio(servicio.nombre);
  };

  return (
    <section id="servicios" className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2>Nuestros Servicios</h2>
          <p className="text-muted m-0">Selecciona los servicios que necesitas para tu mascota:</p>
        </div>
        <div className="bg-white p-3 rounded shadow-sm border border-2 border-primary text-center">
          <span className="d-block fw-bold text-secondary">Servicios seleccionados:</span>
          <span id="contador-servicios" className="fs-4 fw-bold text-primary">{cantidadServicios}</span>
        </div>
      </div>

      {ultimoServicio && (
        <div id="ultimo-producto" className="alert alert-info py-2 mb-3 text-center">
          {ultimoServicio} fue agregado correctamente al carrito.
        </div>
      )}

      <div className="servicios d-flex flex-wrap gap-4 justify-content-center">
        {listaServicios.map((s) => (
          <div key={s.id} className="tarjeta p-3 border rounded shadow-sm bg-white d-flex flex-column justify-content-between" style={{ width: '260px' }}>
            <div>
              <h3>{s.nombre}</h3>
              <p className="text-muted">{s.desc}</p>
            </div>
            <div>
              <span className="precio fw-bold fs-5 text-success">{s.precio}</span>
              <button 
                className="btn btn-primary w-100 mt-2 boton-agregar"
                onClick={() => handleAgregarAlCarrito(s)}
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