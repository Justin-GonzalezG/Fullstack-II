import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistroMascotaPage() {
  const navigate = useNavigate();

  const handleRegistroMascota = async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("mascota-nombre").value;
    const edad = parseInt(document.getElementById("mascota-edad").value) || 0;
    const raza = document.getElementById("mascota-raza").value;
    const vacunas = parseInt(document.getElementById("mascota-vacunas").value) || 0;
    const emailDueno = localStorage.getItem("emailRegistrado");

    try {
      const res = await fetch("http://localhost:8080/api/auth/registro-mascota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          especie: "No especificada",
          raza,
          edad,
          vacunas,
          emailDueno
        })
      });

      if (res.ok) {
        alert("¡Mascota registrada con éxito en MySQL! Ya puedes iniciar sesión.");
        navigate("/login");
      } else {
        const msg = await res.text();
        alert("Error al registrar mascota: " + msg);
      }
    } catch (err) {
      alert("Error de conexión al servidor.");
    }
  };

  return (
    <section id="crear-cuenta-mascota" className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2 className="mb-3" style={{ color: '#0b2545' }}>Datos de tu Mascota</h2>
          <p className="text-muted">
            Queremos conocer mejor a tu compañero para brindarle una atención personalizada y adecuada a sus necesidades.
          </p>
        </div>
        <div className="col-md-6">
          <form id="formulario-mascota" onSubmit={handleRegistroMascota} className="formulario-contenedor p-4 border rounded shadow-sm bg-white">
            <h3 className="mb-3 text-center" style={{ color: '#0b2545' }}>Registrar Mascota</h3>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre de la Mascota</label>
              <input type="text" id="mascota-nombre" className="form-control" required placeholder="Ej. Firulais" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Edad (Años)</label>
              <input type="number" id="mascota-edad" className="form-control" placeholder="Ej. 3" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Raza</label>
              <input type="text" id="mascota-raza" className="form-control" required placeholder="Ej. Mestizo, Poodle" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Cantidad de Vacunas (0 al 5)</label>
              <select id="mascota-vacunas" className="form-control" required>
                <option value="0">0 vacunas</option>
                <option value="1">1 vacuna</option>
                <option value="2">2 vacunas</option>
                <option value="3">3 vacunas</option>
                <option value="4">4 vacunas</option>
                <option value="5">5 vacunas (Al día)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">Finalizar Registro</button>
          </form>
        </div>
      </div>
    </section>
  );
}
