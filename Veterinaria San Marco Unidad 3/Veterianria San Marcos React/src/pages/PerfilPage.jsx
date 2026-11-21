import React, { useState, useEffect } from 'react';

export default function PerfilPage() {
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [email, setEmail] = useState('');
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const nombreReg =
      localStorage.getItem("usuarioLogueado") ||
      localStorage.getItem("nombreRegistrado") ||
      "Usuario Registrado";
    const rolReg =
      localStorage.getItem("rolLogueado") ||
      localStorage.getItem("rolRegistrado") ||
      "Cliente";
    const emailReg = localStorage.getItem("emailRegistrado") || "";
    const token = localStorage.getItem("token");

    setUsuario(nombreReg);
    setRol(rolReg);
    setEmail(emailReg);

    const fetchMascotasBackend = async () => {
      try {
        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(
          `http://localhost:8080/api/auth/mascotas?email=${encodeURIComponent(emailReg)}`,
          { headers }
        );

        if (response.ok) {
          const data = await response.json();
          setMascotas(data);
        } else {
          const listaLocal = JSON.parse(localStorage.getItem("mascotas")) || [];
          setMascotas(listaLocal);
        }
      } catch (error) {
        const listaLocal = JSON.parse(localStorage.getItem("mascotas")) || [];
        setMascotas(listaLocal);
      }
    };

    fetchMascotasBackend();
  }, []);

  const inicial = usuario ? usuario.charAt(0).toUpperCase() : 'U';

  return (
    <section className="container my-5">
      <div className="perfil-header text-center text-md-start mb-4">
        <h2 style={{ color: '#0b2545', fontWeight: 'bold' }}>Mi Perfil</h2>
        <p className="text-muted m-0">
          Gestiona tu información personal y consulta las mascotas asociadas a tu cuenta en MySQL.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="tarjeta-perfil text-center text-md-start p-4 border rounded shadow-sm bg-white">
            <div className="d-flex flex-column align-items-center align-items-md-start">
              <div
                className="avatar-usuario rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-3"
                style={{ width: '70px', height: '70px', fontSize: '28px', fontWeight: 'bold' }}
              >
                {inicial}
              </div>
              <h4 className="fw-bold mb-1" style={{ color: '#0b2545' }}>{usuario}</h4>
              <span className="badge bg-primary mb-4 px-3 py-2">{rol}</span>
            </div>

            <div className="mt-3 w-100">
              <div className="info-item d-flex justify-content-between border-bottom py-2">
                <span className="label text-muted">Nombre:</span>
                <span className="value fw-bold">{usuario}</span>
              </div>
              <div className="info-item d-flex justify-content-between border-bottom py-2">
                <span className="label text-muted">Correo:</span>
                <span className="value fw-bold">{email || 'No registrado'}</span>
              </div>
              <div className="info-item d-flex justify-content-between border-bottom py-2">
                <span className="label text-muted">Rol:</span>
                <span className="value fw-bold">{rol}</span>
              </div>
              <div className="info-item d-flex justify-content-between py-2">
                <span className="label text-muted">Estado:</span>
                <span className="value text-success fw-bold">Activa (MySQL)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="tarjeta-perfil p-4 border rounded shadow-sm bg-white">
            <h3 className="mb-3" style={{ color: '#0b2545' }}>Mis Mascotas Registradas</h3>

            {mascotas.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted">Aún no se reflejan mascotas asociadas a esta sesión.</p>
                <small className="text-muted">
                  Si acabas de registrar una, asegúrate de que el backend en Spring Boot esté procesando y guardando la relación correctamente.
                </small>
              </div>
            ) : (
              mascotas.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className="tarjeta-mascota-item d-flex justify-content-between align-items-center p-3 mb-3 border rounded bg-light"
                >
                  <div>
                    <h5 className="mb-1" style={{ color: '#0b2545' }}>{m.nombre}</h5>
                    <p className="m-0 text-muted small">
                      <strong>Especie:</strong> {m.especie || 'No especificada'} | <strong>Raza:</strong> {m.raza || 'No especificada'} | <strong>Edad:</strong> {m.edad || '0'} años
                    </p>
                  </div>
                  <span className="badge bg-secondary">{m.especie || 'Mascota'}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
