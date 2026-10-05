import React, { useState, useEffect } from 'react';

export default function CitasPages({ usuarioActivo }) {
  const [resultadoCita, setResultadoCita] = useState({ texto: '', clase: '' });
  const [estadoSesionAviso, setEstadoSesionAviso] = useState({ texto: '', color: '' });

  useEffect(() => {
    if (usuarioActivo) {
      setEstadoSesionAviso({
        texto: "Sesión Iniciada como: " + usuarioActivo,
        color: "green"
      });
    } else {
      setEstadoSesionAviso({
        texto: "Debes iniciar sesión para agendar.",
        color: "red"
      });
    }
  }, [usuarioActivo]);

  const handleReservar = (e) => {
    e.preventDefault();

    if (!localStorage.getItem("usuarioLogueado")) {
      alert("Acción Denegada. Debes iniciar sesión para agendar.");
      return;
    }

    const fecha = document.getElementById("agendar").value;
    const horario = document.getElementById("horario").value;

    if (fecha === "" || horario === "") {
      setResultadoCita({
        texto: "Debe completar todos los campos del formulario",
        clase: "alert alert-danger mt-4"
      });
      return;
    }

    setResultadoCita({
      texto: "Cita confirmada para el día " + fecha + " a las " + horario,
      clase: "alert alert-success mt-4"
    });

    e.target.reset();
  };

  return (
    <section id="citas" className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2 className="mb-3" style={{ color: '#0b2545' }}>Reserva tu Cita Profesional</h2>
          <p className="text-muted">
            Selecciona la fecha y el bloque horario que mejor se acomoden a tu disponibilidad para atender a tu mascota con nuestros especialistas.
          </p>
        </div>
        <div className="col-md-6">
          <form id="formulario-citas" onSubmit={handleReservar} className="formulario-contenedor p-4 border rounded shadow-sm bg-white">
            <h3 className="mb-3 text-center" style={{ color: '#0b2545' }}>Agendamiento</h3>
            
            <div 
              id="aviso-sesion" 
              className="mb-3 fw-bold text-center" 
              style={{ color: estadoSesionAviso.color }}
            >
              {estadoSesionAviso.texto}
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Fecha de la Cita</label>
              <input type="date" id="agendar" className="form-control" disabled={!usuarioActivo} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Horario Disponible</label>
              <select id="horario" className="form-control" disabled={!usuarioActivo}>
                <option value="">Seleccione un horario</option>
                <option value="09:00 hrs">09:00 hrs</option>
                <option value="11:30 hrs">11:30 hrs</option>
                <option value="15:00 hrs">15:00 hrs</option>
                <option value="17:30 hrs">17:30 hrs</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100" 
              disabled={!usuarioActivo}
            >
              Reservar Cita
            </button>

            {resultadoCita.texto && (
              <div id="mensaje-resultado" className={resultadoCita.clase}>
                {resultadoCita.texto}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}