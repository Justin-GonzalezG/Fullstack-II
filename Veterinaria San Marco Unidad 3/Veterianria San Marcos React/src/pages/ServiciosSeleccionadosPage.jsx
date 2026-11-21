import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ServiciosSeleccionadosPage({ onVaciarCarrito, onActualizarCarrito }) {
  const [items, setItems] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("misServicios")) || [];
    setItems(guardados);
  }, []);

  const limpiarPrecio = (precio) => {
    const limpio = String(precio ?? '').replace(/[^0-9]/g, '');
    const valor = parseInt(limpio, 10);
    return Number.isNaN(valor) ? 0 : valor;
  };

  const obtenerNombreCategoria = (categoria) => {
    if (typeof categoria === "object" && categoria !== null) {
      return categoria.nombre || "General";
    }
    return categoria || "General";
  };

  const notificarCambioCarrito = (nuevaLista) => {
    if (typeof onActualizarCarrito === "function") {
      onActualizarCarrito(nuevaLista.length);
    }
  };

  const handleEliminar = (indexAEliminar) => {
    const nuevosItems = items.filter((_, idx) => idx !== indexAEliminar);
    setItems(nuevosItems);
    localStorage.setItem("misServicios", JSON.stringify(nuevosItems));
    notificarCambioCarrito(nuevosItems);
  };

  const handleVaciarCarrito = () => {
    setItems([]);
    localStorage.removeItem("misServicios");
    if (typeof onVaciarCarrito === "function") {
      onVaciarCarrito();
    } else {
      notificarCambioCarrito([]);
    }
  };

  const handleConfirmar = async () => {
    if (items.length === 0) return;

    setConfirmando(true);
    setErrorMsg('');
    setMensaje('');

    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      for (const item of items) {
        const nombreCategoria = obtenerNombreCategoria(item.categoria);
        const categoriaObj =
          typeof item.categoria === "object" && item.categoria !== null && item.categoria.id
            ? { id: item.categoria.id, nombre: nombreCategoria }
            : { nombre: nombreCategoria };

        const payload = {
          nombre: item.nombre,
          precio: limpiarPrecio(item.precio),
          stock: item.stock ?? 1,
          descripcion: item.desc || item.descripcion || "Producto/Servicio confirmado desde el carrito",
          categoria: categoriaObj,
        };

        const response = await fetch("http://localhost:8080/api/productos", {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const detalleError = await response.text();
          throw new Error(detalleError || `Error HTTP ${response.status}`);
        }
      }

      setMensaje("¡Compra/Solicitud confirmada con éxito! Su compra quedo registrada.");
      setItems([]);
      localStorage.removeItem("misServicios");
      if (typeof onVaciarCarrito === "function") {
        onVaciarCarrito();
      } else {
        notificarCambioCarrito([]);
      }
    } catch (err) {
      console.error("Error al guardar en la base de datos:", err);
      setErrorMsg(`No se pudo confirmar la compra: ${err.message}`);
    } finally {
      setConfirmando(false);
    }
  };

  const calcularTotal = () => {
    return items.reduce((acc, item) => acc + limpiarPrecio(item.precio), 0);
  };

  return (
    <section className="container my-5">
      <div className="carrito-header text-center text-md-start">
        <h2 style={{ color: '#0b2545', fontWeight: 'bold' }}>Carrito de Servicios y Productos</h2>
        <p className="text-muted m-0">Revisa el detalle de tus selecciones antes de confirmar tu solicitud.</p>
      </div>

      {errorMsg && (
        <div className="alert alert-danger text-center py-3 mb-4">
          {errorMsg}
        </div>
      )}

      {mensaje && (
        <div className="alert alert-success text-center py-3 mb-4">
          <h4>{mensaje}</h4>
          <Link to="/" className="btn btn-outline-success mt-2">Volver al Inicio</Link>
        </div>
      )}

      <div className="row g-4">
        {/* Lista de ítems en el carrito */}
        <div className="col-lg-8">
          <div className="tarjeta-carrito">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="m-0" style={{ color: '#0b2545', fontWeight: '700' }}>Ítems Seleccionados</h4>
              {items.length > 0 && (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleVaciarCarrito}
                >
                  Vaciar Carrito
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted fs-5">Tu carrito está vacío actualmente.</p>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <Link to="/servicios" className="btn btn-primary">Ver Servicios</Link>
                  <Link to="/tienda" className="btn btn-outline-primary">Ver Tienda</Link>
                </div>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.nombre}-${idx}`} className="item-carrito flex-wrap gap-2">
                  <div>
                    <h5>{item.nombre}</h5>
                    <p className="text-muted small m-0">
                      {item.desc || item.descripcion || 'Servicio/Producto para tu mascota'}
                    </p>
                    <small className="text-secondary">
                      Categoría: {obtenerNombreCategoria(item.categoria)}
                    </small>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="precio-item">${limpiarPrecio(item.precio).toLocaleString('es-CL')}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEliminar(idx)}
                      title="Eliminar ítem"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Resumen de Total */}
        <div className="col-lg-4">
          <div className="tarjeta-carrito">
            <h4 className="fw-bold mb-3" style={{ color: '#0b2545' }}>Resumen</h4>
            <div className="resumen-total-box mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Cantidad de ítems:</span>
                <span className="fw-bold">{items.length}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center fs-5">
                <span className="fw-bold" style={{ color: '#0b2545' }}>Total Estimado:</span>
                <span className="fw-bold text-success">${calcularTotal().toLocaleString('es-CL')}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-success w-100 py-2 fw-bold fs-6"
              disabled={items.length === 0 || confirmando}
              onClick={handleConfirmar}
            >
              {confirmando ? 'Confirmando...' : 'Confirmar Solicitud'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
