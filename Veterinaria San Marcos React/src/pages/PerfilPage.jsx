import React, { useState, useEffect } from 'react';

export default function PerfilPage() {
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const userLog = localStorage.getItem("usuarioLogueado") || "Usuario Registrado";
    const rolLog = localStorage.getItem("rolLogueado") || "Cliente";
    const listaMascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

    setUsuario(userLog);
    setRol(rolLog);
    setMascotas(listaMascotas);
  }, []);

  const inicial = usuario ? usuario.charAt(0).toUpperCase() : 'U';

  return (
    <section className="container my-5">
      <div className="perfil-header text-center text-md-start">
        <h2 style={{ color: '#0b2545', fontWeight: 'bold' }}>Mi Perfil</h2>
        <p className="text-muted m-0">Gestiona tu información personal y consulta las mascotas asociadas a tu cuenta.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="tarjeta-perfil text-center text-md-start">
            <div className="d-flex flex-column align-items-center align-items-md-start">
              <div className="avatar-usuario">{inicial}</div>
              <h4 className="fw-bold mb-1" style={{ color: '#0b2545' }}>{usuario}</h4>
              <span className="badge bg-primary mb-4 px-3 py-2">{rol}</span>
            </div>

            <div className="mt-3">
              <div className="info-item">
                <span className="label">Nombre de Usuario:</span>
                <span className="value">{usuario}</span>
              </div>
              <div className="info-item">
                <span className="label">Rol en el sistema:</span>
                <span className="value">{rol}</span>
              </div>
              <div className="info-item">
                <span className="label">Estado de la cuenta:</span>
                <span className="value text-success fw-bold">Activa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="tarjeta-perfil">
            <h3>Mis Mascotas Registradas</h3>

            {mascotas.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted">Aún no has registrado ninguna mascota en tu cuenta.</p>
              </div>
            ) : (
              mascotas.map((m, idx) => (
                <div key={idx} className="tarjeta-mascota-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{m.nombre}</h5>
                    <p className="m-0 text-muted small">
                      <strong>Especie:</strong> {m.especie} | <strong>Raza:</strong> {m.raza || 'No especificada'} | <strong>Edad:</strong> {m.edad || '0'} años
                    </p>
                  </div>
                  <span className="badge bg-secondary">{m.especie}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}