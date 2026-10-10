import React, { useState, useEffect } from 'react';

export default function CitasPages({ usuarioActivo }) {
  const [mascotas, setMascotas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [citas, setCitas] = useState([]);

  const [mascotaSel, setMascotaSel] = useState('');
  const [servicioSel, setServicioSel] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const listaMascotas = JSON.parse(localStorage.getItem("mascotas")) || [];
    setMascotas(listaMascotas);

    setServicios([
      "Consulta General",
      "Vacunación y Desparasitación",
      "Peluquería y Estética Canina",
      "Atención de Urgencias 24/7",
      "Limpieza Dental Ultrasónica",
      "Cirugías y Esterilización"
    ]);

    const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];
    setCitas(citasGuardadas);
  }, []);

  const handleAgendar = (e) => {
    e.preventDefault();

    if (!usuarioActivo) {
      alert("Debes iniciar sesión para agendar una cita.");
      return;
    }

    if (!mascotaSel || !servicioSel || !fecha || !hora) {
      setMensaje("Por favor completa todos los campos del formulario.");
      return;
    }

    const nuevaCita = {
      id: Date.now(),
      usuario: usuarioActivo,
      mascota: mascotaSel,
      servicio: servicioSel,
      fecha,
      hora,
      estado: "Confirmada"
    };

    const citasActualizadas = [...citas, nuevaCita];
    localStorage.setItem("citas", JSON.stringify(citasActualizadas));
    setCitas(citasActualizadas);

    setMensaje("¡Cita agendada con éxito!");
    setMascotaSel('');
    setServicioSel('');
    setFecha('');
    setHora('');
  };

  return (
    <section className="container my-5">
      <div className="citas-header text-center text-md-start">
        <h2 style={{ color: '#0b2545', fontWeight: 'bold' }}>Agendamiento de Citas</h2>
        <p className="text-muted m-0">Reserva una hora médica o de atención para tu mascota de forma rápida y sencilla.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="tarjeta-citas-form">
            <h3>Agendar Nueva Cita</h3>

            {mensaje && (
              <div className={`alert ${mensaje.includes('éxito') ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>
                {mensaje}
              </div>
            )}

            <form onSubmit={handleAgendar}>
              <div className="mb-3">
                <label className="form-label fw-bold">Selecciona tu Mascota:</label>
                <select 
                  className="form-select"
                  value={mascotaSel}
                  onChange={(e) => setMascotaSel(e.target.value)}
                >
                  <option value="">-- Seleccionar --</option>
                  {mascotas.map((m, idx) => (
                    <option key={idx} value={m.nombre}>{m.nombre} ({m.especie})</option>
                  ))}
                </select>
                {mascotas.length === 0 && (
                  <small className="text-muted">Si no ves a tu mascota, regístrala primero en la sección correspondiente.</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Servicio Requerido:</label>
                <select 
                  className="form-select"
                  value={servicioSel}
                  onChange={(e) => setServicioSel(e.target.value)}
                >
                  <option value="">-- Seleccionar Servicio --</option>
                  {servicios.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="row g-2 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Fecha:</label>
                  <input 
                    type="date" 
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Hora:</label>
                  <input 
                    type="time" 
                    className="form-control"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                Confirmar Reserva
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="tarjeta-citas-form">
            <h3>Mis Citas Agendadas</h3>

            {citas.length === 0 ? (
              <p className="text-muted text-center py-4">No tienes citas registradas por el momento.</p>
            ) : (
              citas.map((c) => (
                <div key={c.id} className="tarjeta-cita-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{c.servicio}</h5>
                    <p className="m-0 text-muted small">
                      <strong>Mascota:</strong> {c.mascota} | <strong>Fecha:</strong> {c.fecha} a las {c.hora} hrs.
                    </p>
                  </div>
                  <span className="badge-estado-cita">{c.estado}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}