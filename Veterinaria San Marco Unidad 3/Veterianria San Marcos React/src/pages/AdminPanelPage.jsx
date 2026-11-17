import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export default function AdminPanelPage() {
  const navigate = useNavigate();
  const [rol, setRol] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  
  // Estados para los datos reales de MySQL
  const [productos, setProductos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Formulario simple para nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '', categoria: '' });

  useEffect(() => {
    const rolActual = localStorage.getItem("rolLogueado") || localStorage.getItem("rol");
    const usuarioActual = localStorage.getItem("usuarioLogueado") || localStorage.getItem("nombre");

    setRol(rolActual || "Administrador");
    setNombreUsuario(usuarioActual || "Personal Autorizado");

    // Cargar datos reales desde el Backend de Spring Boot
    cargarDatosBackend();
  }, [navigate]);

  const cargarDatosBackend = async () => {
    try {
      // 1. Cargar Productos
      const resProd = await fetch(`${API_URL}/productos`);
      if (resProd.ok) setProductos(await resProd.json());

      // 2. Cargar Citas
      const resCitas = await fetch(`${API_URL}/citas`);
      if (resCitas.ok) setCitas(await resCitas.json());

      // 3. Cargar Usuarios
      const resUsers = await fetch(`${API_URL}/auth/usuarios`);
      if (resUsers.ok) setUsuarios(await resUsers.json());
    } catch (error) {
      console.error("Error conectando con el backend:", error);
    }
  };

  const handleCrearProducto = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });
      if (res.ok) {
        alert("Producto creado exitosamente");
        setNuevoProducto({ nombre: '', precio: '', categoria: '' });
        cargarDatosBackend();
      }
    } catch (error) {
      alert("Error al crear producto");
    }
  };

  const handleEliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      const res = await fetch(`${API_URL}/productos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        cargarDatosBackend();
      }
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      const res = await fetch(`${API_URL}/auth/usuarios/${id}`, { method: 'DELETE' });
      if (res.ok) {
        cargarDatosBackend();
      }
    } catch (error) {
      alert("Error al eliminar usuario");
    }
  };

  return (
    <section id="panel-admin" className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 style={{ color: '#0b2545' }}>Panel de Control ({rol})</h2>
          <p className="text-muted m-0">Bienvenido al sistema interno de la Veterinaria San Marcos, <strong>{nombreUsuario}</strong>.</p>
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={() => { localStorage.clear(); navigate("/"); }}>
          Cerrar Sesión
        </button>
      </div>

      {/* SECCIÓN 1: GESTIÓN DE PRODUCTOS */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h3 className="card-title h5 text-primary mb-3">Gestión de Catálogo (Productos)</h3>
          
          {/* Formulario rápido de creación */}
          <form onSubmit={handleCrearProducto} className="row g-3 mb-4">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Nombre del producto" value={nuevoProducto.nombre} onChange={e => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} required />
            </div>
            <div className="col-md-3">
              <input type="number" className="form-control" placeholder="Precio ($)" value={nuevoProducto.precio} onChange={e => setNuevoProducto({...nuevoProducto, precio: e.target.value})} required />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Categoría" value={nuevoProducto.categoria} onChange={e => setNuevoProducto({...nuevoProducto, categoria: e.target.value})} />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">Agregar</button>
            </div>
          </form>

          {/* Tabla de Productos */}
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.id || p.codigo}>
                    <td>{p.id || p.codigo}</td>
                    <td>{p.nombre}</td>
                    <td>${p.precio}</td>
                    <td>{p.categoria || 'General'}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleEliminarProducto(p.id || p.codigo)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
                {productos.length === 0 && (
                  <tr><td colSpan="5" className="text-center text-muted">No hay productos registrados en MySQL.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: CITAS MÉDICAS */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h3 className="card-title h5 text-primary mb-3">Citas Médicas Agendadas</h3>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {citas.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.servicio}</td>
                    <td>{c.fecha}</td>
                    <td>{c.hora}</td>
                    <td><span className="badge bg-info text-dark">{c.estado || 'Pendiente'}</span></td>
                  </tr>
                ))}
                {citas.length === 0 && (
                  <tr><td colSpan="5" className="text-center text-muted">No hay citas registradas en el sistema.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: USUARIOS REGISTRADOS */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h3 className="card-title h5 text-primary mb-3">Gestión de Usuarios y Roles</h3>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td><span className="badge bg-secondary">{u.rol}</span></td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleEliminarUsuario(u.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
