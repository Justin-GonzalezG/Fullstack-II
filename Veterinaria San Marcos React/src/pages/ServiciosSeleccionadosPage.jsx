import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ServiciosSeleccionadosPage() {
  const [items, setItems] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("misServicios")) || [];
    setItems(guardados);
  }, []);

  const handleEliminar = (indexAEliminar) => {
    const nuevosItems = items.filter((_, idx) => idx !== indexAEliminar);
    setItems(nuevosItems);
    localStorage.setItem("misServicios", JSON.stringify(nuevosItems));
  };

  const handleVaciarCarrito = () => {
    setItems([]);
    localStorage.removeItem("misServicios");
  };

  const handleConfirmar = () => {
    if (items.length === 0) return;
    setMensaje("¡Solicitud/Compra confirmada con éxito! Nos pondremos en contacto contigo.");
    setItems([]);
    localStorage.removeItem("misServicios");
  };

  // Calcular precio total dinámicamente convirtiendo "$15.000" a número
  const calcularTotal = () => {
    return items.reduce((acc, item) => {
      const precioLimpio = parseInt(item.precio.replace(/[^0-9]/g, '')) || 0;
      return acc + precioLimpio;
    }, 0);
  };

  return (
    <section className="container my-5">
      <div className="carrito-header text-center text-md-start">
        <h2 style={{ color: '#0b2545', fontWeight: 'bold' }}>Carrito de Servicios y Productos</h2>
        <p className="text-muted m-0">Revisa el detalle de tus selecciones antes de confirmar tu solicitud.</p>
      </div>

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
                <div key={idx} className="item-carrito flex-wrap gap-2">
                  <div>
                    <h5>{item.nombre}</h5>
                    <p className="text-muted small m-0">{item.desc || 'Servicio/Producto para tu mascota'}</p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="precio-item">{item.precio}</span>
                    <button 
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
              className="btn btn-success w-100 py-2 fw-bold fs-6"
              disabled={items.length === 0}
              onClick={handleConfirmar}
            >
              Confirmar Solicitud
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}