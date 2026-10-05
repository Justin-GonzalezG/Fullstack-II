import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const emailLogin = document.getElementById("login-email").value;
    const passwordLogin = document.getElementById("login-password").value;

    const emailGuardado = localStorage.getItem("emailRegistrado");
    const passwordGuardado = localStorage.getItem("passwordRegistrado");
    const nombreGuardado = localStorage.getItem("nombreRegistrado");

    if (emailLogin === emailGuardado && passwordLogin === passwordGuardado) {
      
      let rolAsignado = "Cliente";
      if (emailLogin.includes(".admin@vetesm.cl")) {
        rolAsignado = "Administrador";
      } else if (emailLogin.includes(".trabajador@vetesm.cl")) {
        rolAsignado = "Trabajador";
      }

      localStorage.setItem("usuarioLogueado", nombreGuardado);
      localStorage.setItem("rolLogueado", rolAsignado);

      alert("Bienvenido " + nombreGuardado + " (" + rolAsignado + ")");
      onLoginSuccess(nombreGuardado, rolAsignado);
      navigate("/");
    } else {
      alert("Correo o contraseña incorrectos, o la cuenta no existe.");
    }
  };

  return (
    <section id="inicio-sesion" className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <p id="mensaje-inicio">
            "Accede a tu cuenta para gestionar tus citas médicas y asegurar el bienestar de tu compañero fiel."
          </p>
          <div className="alert alert-secondary mt-3 p-3">
            <small className="d-block fw-bold text-dark mb-1">💡 Tips de correos para probar roles:</small>
            <small className="d-block text-muted">• Administrador: <code>tu.nombre.admin@vetesm.cl</code></small>
            <small className="d-block text-muted">• Trabajador: <code>tu.nombre.trabajador@vetesm.cl</code></small>
            <small className="d-block text-muted">• Cliente: <code>cualquier.correo@gmail.com</code></small>
          </div>
        </div>
        <div className="col-md-6">
          <form id="formulario-login" onSubmit={handleLogin} className="formulario-contenedor p-4 border rounded shadow-sm bg-white">
            <h3 className="mb-3 text-center" style={{ color: '#0b2545' }}>Iniciar Sesión</h3>

            <div className="mb-3">
              <label className="form-label fw-bold">Correo Electrónico</label>
              <input type="email" id="login-email" className="form-control" required placeholder="correo@ejemplo.com" />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Contraseña</label>
              <input type="password" id="login-password" className="form-control" required placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
          </form>
        </div>
      </div>
    </section>
  );
}