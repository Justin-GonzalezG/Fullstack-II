import React, { useState } from 'react';

import img1 from '../assets/Catalogo 1.png';
import img2 from '../assets/Catalogo 2.png';
import img3 from '../assets/Catalogo 3.png';
import img4 from '../assets/Catalogo 4.png';
import img5 from '../assets/Catalogo 5.png';
import img6 from '../assets/Catalogo 6.png';

export default function TiendaPages({ onAgregarProducto, cantidadCarrito = 0 }) {
  const [ultimoProducto, setUltimoProducto] = useState('');

  const productosCatalogo = [
    {
      id: 1,
      nombre: "Alimento Premium Perro (15 kg)",
      precio: "35.000",
      desc: "Alimento balanceado de alta calidad rico en proteínas para perros adultos.",
      categoria: "Alimento",
      imagen: img1
    },
    {
      id: 2,
      nombre: "Alimento Húmedo Gato (Lata 300g)",
      precio: "3.500",
      desc: "Paté nutritivo con sabor a salmón para gatos exigentes.",
      categoria: "Alimento",
      imagen: img2
    },
    {
      id: 3,
      nombre: "Juguete Mordedor Kong",
      precio: "8.990",
      desc: "Juguete de goma ultra resistente para reducir la ansiedad y entretener a tu mascota.",
      categoria: "Accesorios",
      imagen: img3
    },
    {
      id: 4,
      nombre: "Correa Ajustable con Placa",
      precio: "6.500",
      desc: "Correa reflectante de alta durabilidad con diseño ergonómico.",
      categoria: "Accesorios",
      imagen: img4
    },
    {
      id: 5,
      nombre: "Cama Acolchada Confort",
      precio: "18.500",
      desc: "Cama suave, lavable y térmica para el descanso ideal de perros y gatos.",
      categoria: "Confort",
      imagen: img5
    },
    {
      id: 6,
      nombre: "Cama Mascota Diseño Huellitas",
      precio: "18.500",
      desc: "Cama suave, acogedora, térmica y lavable con diseño de huellitas para gatos y perros.",
      categoria: "Confort",
      imagen: img6
    }
  ];

  const handleAgregarAlCarrito = (producto) => {
    const tieneSesion =
      localStorage.getItem("usuarioLogueado") ||
      localStorage.getItem("token") ||
      localStorage.getItem("usuario");

    if (!tieneSesion) {
      alert("Debes iniciar sesión para comprar productos en la tienda.");
      return;
    }

    const itemsActuales = JSON.parse(localStorage.getItem("misServicios")) || [];
    const nuevosItems = [...itemsActuales, producto];
    localStorage.setItem("misServicios", JSON.stringify(nuevosItems));

    setUltimoProducto(producto.nombre);
    if (typeof onAgregarProducto === "function") {
      onAgregarProducto(producto);
    }
  };

  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 bg-white p-4 rounded shadow-sm border">
        <div>
          <h2 style={{ color: '#0b2545', fontWeight: 'bold' }} className="mb-1">
            Tienda de Productos
          </h2>
          <p className="text-muted m-0">
            Encuentra los mejores artículos, alimentos y accesorios para tu mascota:
          </p>
        </div>
        <div className="bg-light px-4 py-2 rounded border text-center">
          <span className="d-block fw-bold text-secondary small">Ítems en el carrito:</span>
          <span className="fs-4 fw-bold text-primary">{cantidadCarrito}</span>
        </div>
      </div>

      {ultimoProducto && (
        <div className="alert alert-success py-2 mb-4 text-center">
          ¡<strong>{ultimoProducto}</strong> fue agregado exitosamente al carrito!
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {productosCatalogo.map((p) => (
          <div key={p.id} className="col">
            <div className="card h-100 shadow-sm border">
              <div className="p-3 bg-light rounded-top text-center">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="img-fluid rounded"
                  style={{ height: '180px', width: '100%', objectFit: 'contain' }}
                />
              </div>

              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <span className="badge bg-primary mb-2">{p.categoria}</span>
                  <h5 className="card-title fw-bold mb-1" style={{ color: '#0b2545' }}>
                    {p.nombre}
                  </h5>
                  <p className="card-text text-muted small">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-top">
                  <div className="fs-5 fw-bold text-success mb-2">${p.precio}</div>
                  <button
                    type="button"
                    className="btn btn-primary w-100 fw-semibold"
                    onClick={() => handleAgregarAlCarrito(p)}
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
