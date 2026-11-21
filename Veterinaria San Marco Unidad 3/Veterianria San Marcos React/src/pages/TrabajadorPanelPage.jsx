import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

function getStoredToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken") ||
    ""
  );
}

function buildAuthHeaders(includeJson = false) {
  const headers = {};
  if (includeJson) {
    headers["Content-Type"] = "application/json";
  }
  const token = getStoredToken();
  if (token) {
    headers["Authorization"] = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }
  return headers;
}

export default function TrabajadorPanelPage() {
  const navigate = useNavigate();
  const [rol, setRol] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  useEffect(() => {
    const rolActual =
      localStorage.getItem("rolLogueado") || localStorage.getItem("rol");
    const usuarioActual =
      localStorage.getItem("usuarioLogueado") || localStorage.getItem("nombre");

    setRol(rolActual || "ROL_TRABAJADOR");
    setNombreUsuario(usuarioActual || "Personal de Atención");

    cargarOperacionDiaria();
  }, []);

  const cargarOperacionDiaria = async () => {
    setCargando(true);
    try {
      const headers = buildAuthHeaders(false);

      let pedidosCargados = [];
      for (const ruta of ["pedidos", "ordenes"]) {
        try {
          const resPed = await fetch(`${API_URL}/${ruta}`, { headers });
          if (resPed.ok) {
            const data = await resPed.json();
            if (Array.isArray(data)) {
              pedidosCargados = data;
              break;
            }
          }
        } catch {

        }
      }
      setPedidos(pedidosCargados);

      const resCitas = await fetch(`${API_URL}/citas`, { headers });
      if (resCitas.ok) {
        const dataCitas = await resCitas.json();
        setCitas(Array.isArray(dataCitas) ? dataCitas : []);
      }
    } catch (error) {
      console.error("Error cargando datos del panel de trabajador:", error);
    } finally {
      setCargando(false);
    }
  };

  const handleActualizarEstadoPedido = async (id, nuevoEstado) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );

    try {
      await fetch(`${API_URL}/pedidos/${id}`, {
        method: 'PUT',
        headers: buildAuthHeaders(true),
        body: JSON.stringify({ estado: nuevoEstado }),
      });
    } catch {
    }
  };

  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtroEstado === 'TODOS') return true;
    return String(p.estado || 'PENDIENTE').toUpperCase() === filtroEstado;
  });

  return (
    <section id="panel-trabajador" className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 style={{ color: '#0b2545' }}>Panel de Pedidos ({rol})</h2>
          <p className="text-muted m-0">
            Atención y seguimiento de pedidos y citas —{" "}
            <strong>{nombreUsuario}</strong>.
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={cargarOperacionDiaria}
            disabled={cargando}
          >
            {cargando ? "Actualizando..." : "Actualizar"}
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* SECCIÓN 1: PEDIDOS DE TIENDA / SERVICIOS */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h3 className="card-title h5 text-primary m-0">
              Pedidos y Solicitudes de Clientes
            </h3>
            <div className="d-flex gap-2">
              <button
                type="button"
                className={`btn btn-sm ${
                  filtroEstado === 'TODOS' ? 'btn-primary' : 'btn-outline-primary'
                }`}
                onClick={() => setFiltroEstado('TODOS')}
              >
                Todos ({pedidos.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  filtroEstado === 'PENDIENTE'
                    ? 'btn-warning text-dark'
                    : 'btn-outline-warning text-dark'
                }`}
                onClick={() => setFiltroEstado('PENDIENTE')}
              >
                Pendientes
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  filtroEstado === 'COMPLETADO'
                    ? 'btn-success'
                    : 'btn-outline-success'
                }`}
                onClick={() => setFiltroEstado('COMPLETADO')}
              >
                Completados
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>ID Pedido</th>
                  <th>Cliente / Detalle</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Gestión</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((p, idx) => {
                  const idPedido = p.id ?? idx + 1;
                  const estadoActual = String(p.estado || 'PENDIENTE').toUpperCase();
                  return (
                    <tr key={idPedido}>
                      <td>#{idPedido}</td>
                      <td>
                        {p.clienteNombre ||
                          p.usuario?.nombre ||
                          p.descripcion ||
                          p.detalle ||
                          'Pedido registrado'}
                      </td>
                      <td>
                        {p.total != null
                          ? `$${Number(p.total).toLocaleString('es-CL')}`
                          : '-'}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            estadoActual === 'COMPLETADO'
                              ? 'bg-success'
                              : 'bg-warning text-dark'
                          }`}
                        >
                          {estadoActual}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-warning text-dark"
                            onClick={() =>
                              handleActualizarEstadoPedido(idPedido, 'PENDIENTE')
                            }
                          >
                            Pendiente
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() =>
                              handleActualizarEstadoPedido(idPedido, 'COMPLETADO')
                            }
                          >
                            Completar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {pedidosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      {cargando
                        ? "Cargando pedidos..."
                        : "Aún no hay pedidos registrados en el backend o no coinciden con el filtro."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: CITAS AGENDADAS PARA ATENCIÓN */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h3 className="card-title h5 text-primary mb-3">
            Citas Programadas para Atención
          </h3>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
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
                {citas.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.servicio || c.motivo || '-'}</td>
                    <td>{c.fecha || '-'}</td>
                    <td>{c.hora || '-'}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {c.estado || 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                ))}
                {citas.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">
                      {cargando
                        ? "Cargando citas..."
                        : "No hay citas registradas en el sistema."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
