import React, { useState, useEffect } from 'react';

import img1 from '../assets/Catalogo 1.png';
import img2 from '../assets/Catalogo 2.png';
import img3 from '../assets/Catalogo 3.png';
import img4 from '../assets/Catalogo 4.png';
import img5 from '../assets/Catalogo 5.png';
import img6 from '../assets/Catalogo 5.png';

export default function TiendaPages({ onAgregarProducto, cantidadCarrito }) {
  const [listaProductos, setListaProductos] = useState([]);
  const [ultimoProducto, setUltimoProducto] = useState('');

  const productosLocales = [
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
      nombre: "Shampoo Antipulgas (250 ml)", 
      precio: "7.990", 
      desc: "Fórmula especial de limpieza profunda con protección contra parásitos externos.", 
      categoria: "Higiene",
      imagen: img6 
    }
  ];

  const imagenesEstaticas = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {

    fetch("http://localhost:8080/api/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del backend");
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {

          const productosConImagen = data.map((p, index) => ({
            ...p,
            precio: p.precio ? p.precio.toString().replace('$', '') : '0',
            desc: p.descripcion || p.desc || "Sin descripción",
            imagen: p.imagen || imagenesEstaticas[index % imagenesEstaticas.length]
          }));
          
          setListaProductos(productosConImagen);
        } else {
          setListaProductos(productosLocales);
        }
      })
      .catch((err) => {
        console.warn("Backend no disponible o sin conexión, usando productos locales:", err);
        setListaProductos(productosLocales);
      });
  }, []);

  const handleAgregarAlCarrito = (producto) => {
    if (!localStorage.getItem("usuarioLogueado")) {
      alert("Debes iniciar sesión para comprar productos en la tienda.");
      return;
    }

    const itemsActuales = JSON.parse(localStorage.getItem("misServicios")) || [];
    const nuevosItems = [...itemsActuales, producto];
    localStorage.setItem("misServicios", JSON.stringify(nuevosItems));

    setUltimoProducto(producto.nombre);
    onAgregarProducto();
  };

  return (
    <section className="container my-5">
      <div className="tienda-header d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 style={{ color: '#0b2545', fontWeight: 'bold' }}>Tienda de Productos</h2>
          <p className="text-muted m-0">Encuentra los mejores artículos, alimentos y accesorios para tu mascota:</p>
        </div>
        <div className="bg-light p-3 rounded border text-center">
          <span className="d-block fw-bold text-secondary">Ítems en el carrito:</span>
          <span className="fs-4 fw-bold text-primary">{cantidadCarrito}</span>
        </div>
      </div>

      {ultimoProducto && (
        <div className="alert alert-success py-2 mb-4 text-center">
          ¡<strong>{ultimoProducto}</strong> fue agregado exitosamente al carrito!
        </div>
      )}

      <div className="tienda-grid">
        {listaProductos.map((p) => (
          <div key={p.id || p.nombre} className="tarjeta-producto">
            <div>
              <div className="imagen-producto-container mb-3 text-center">
                <img 
                  src={p.imagen} 
                  alt={p.nombre} 
                  className="img-fluid rounded shadow-sm" 
                  style={{ height: '160px', width: '100%', objectFit: 'cover' }} 
                />
              </div>
              <span className="badge-categoria">{p.categoria}</span>
              <h3>{p.nombre}</h3>
              <p>{p.desc}</p>
            </div>
            <div>
              <span className="precio-producto">${p.precio}</span>
              <button 
                className="btn btn-primary w-100 mt-3"
                onClick={() => handleAgregarAlCarrito(p)}
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}