import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistroMascotaPage() {
  const navigate = useNavigate();

  const handleRegistroMascota = async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("mascota-nombre").value;
    const especie = document.getElementById("mascota-especie").value;
    const edad = parseInt(document.getElementById("mascota-edad").value) || 0;
    const raza = document.getElementById("mascota-raza").value;
    const vacunas = parseInt(document.getElementById("mascota-vacunas").value) || 0;
    const emailDueno = localStorage.getItem("emailRegistrado");

    if (!emailDueno) {
      alert("No se encontró el correo del dueño activo. Por favor, crea tu cuenta o inicia sesión primero.");
      navigate("/registro");
      return;
    }

    const nuevaMascota = {
      nombre,
      especie,
      raza,
      edad,
      vacunas,
      emailDueno
    };

    try {
      const res = await fetch("http://localhost:8080/api/auth/registro-mascota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaMascota)
      });

      if (res.ok) {
        // Respaldo local para que CitasPages y PerfilPage siempre la muestren de inmediato
        const mascotasGuardadas = JSON.parse(localStorage.getItem("mascotas")) || [];
        localStorage.setItem("mascotas", JSON.stringify([...mascotasGuardadas, nuevaMascota]));

        alert("¡Mascota registrada con éxito en MySQL!");
        navigate(localStorage.getItem("usuarioLogueado") ? "/perfil" : "/login");
      } else {
        const msg = await res.text();
        alert("Error al registrar mascota en el servidor: " + msg);
      }
    } catch (err) {
      alert("Error de conexión al servidor backend.");
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
              <label className="form-label fw-bold">Especie</label>
              <select id="mascota-especie" className="form-select" required>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Conejo">Conejo</option>
                <option value="Ave">Ave</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Edad (Años)</label>
              <input type="number" id="mascota-edad" className="form-control" min="0" placeholder="Ej. 3" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Raza</label>
              <input type="text" id="mascota-raza" className="form-control" required placeholder="Ej. Mestizo, Poodle" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Cantidad de Vacunas (0 al 5)</label>
              <select id="mascota-vacunas" className="form-select" required>
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
