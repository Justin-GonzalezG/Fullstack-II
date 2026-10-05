import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistroPage() {
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();
    const nombre = document.getElementById("registro-nombre").value;
    const email = document.getElementById("registro-email").value;
    const password = document.getElementById("registro-password").value;
    const repetirPassword = document.getElementById("registro-repetir-password").value;

    if (password !== repetirPassword) {
      alert("Las contraseñas no coinciden. Por favor, revísalas.");
      return;
    }

    let rolDetectado = "Cliente";
    if (email.includes(".admin@vetesm.cl")) {
      rolDetectado = "Administrador";
    } else if (email.includes(".trabajador@vetesm.cl")) {
      rolDetectado = "Trabajador";
    }

    localStorage.setItem("nombreRegistrado", nombre);
    localStorage.setItem("emailRegistrado", email);
    localStorage.setItem("passwordRegistrado", password);
    localStorage.setItem("rolRegistrado", rolDetectado);

    alert("¡Cuenta creada con éxito! Ahora registra los datos de tu mascota.");
    e.target.reset();

    if (rolDetectado === "Cliente") {
      navigate("/registro-mascota");
    } else {
      navigate("/login");
    }
  };

  return (
    <section id="crear-cuenta" className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6 order-md-2">
          <p id="mensaje-crear">
            "Únete a nuestra comunidad veterinaria. Regístrate hoy y obtén beneficios exclusivos para el cuidado de tus mascotas."
          </p>
          <div className="alert alert-info mt-3 p-3">
            <small className="d-block fw-bold text-primary mb-1">📌 Nota sobre el registro:</small>
            <small className="d-block text-muted">El sistema asignará el rol de forma automática si usas terminaciones como <code>.admin@vetesm.cl</code>, <code>.trabajador@vetesm.cl</code> o un correo normal (@gmail.com).</small>
          </div>
        </div>
        <div className="col-md-6 order-md-1">
          <form id="formulario-registro" onSubmit={handleRegistro} className="formulario-contenedor p-4 border rounded shadow-sm bg-white">
            <h3 className="mb-3 text-center" style={{ color: '#0b2545' }}>Crear Cuenta</h3>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre Completo</label>
              <input type="text" id="registro-nombre" className="form-control" required placeholder="Tu nombre" />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Correo Electrónico</label>
              <input type="email" id="registro-email" className="form-control" required placeholder="correo@ejemplo.com" />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Contraseña</label>
              <input type="password" id="registro-password" className="form-control" required placeholder="••••••••" />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Repetir Contraseña</label>
              <input type="password" id="registro-repetir-password" className="form-control" required placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Siguiente: Registrar Mascota</button>
          </form>
        </div>
      </div>
    </section>
  );
}