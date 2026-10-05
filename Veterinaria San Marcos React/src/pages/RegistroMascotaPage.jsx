import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistroMascotaPage() {
  const navigate = useNavigate();

  const handleRegistroMascota = (e) => {
    e.preventDefault();
    const nombreMascota = document.getElementById("mascota-nombre").value;
    const edadMascota = document.getElementById("mascota-edad").value;
    const razaMascota = document.getElementById("mascota-raza").value;
    const vacunasMascota = document.getElementById("mascota-vacunas").value;

    localStorage.setItem("nombreMascota", nombreMascota);
    localStorage.setItem("edadMascota", edadMascota || "No especificada");
    localStorage.setItem("razaMascota", razaMascota);
    localStorage.setItem("vacunasMascota", vacunasMascota);

    alert("¡Mascota registrada con éxito! Ya puedes iniciar sesión.");
    navigate("/login");
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
              <label className="form-label fw-bold">Edad (Opcional)</label>
              <input type="text" id="mascota-edad" className="form-control" placeholder="Ej. 3 años o 6 meses" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Raza</label>
              <input type="text" id="mascota-raza" className="form-control" required placeholder="Ej. Mestizo, Poodle, etc." />
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