import React from 'react';
import imgCompasion from '../assets/Compasion.png';
import imgConfianza from '../assets/Confianza.png';
import imgProfesionalismo from '../assets/Profesionalismo.png';

export default function Valores() {
  const listaValores = [
    {
      imagen: imgCompasion,
      titulo: "Compromiso y Amor Animal",
      desc: "Tratamos a cada paciente como si fuera nuestro. Su bienestar emocional y físico es nuestra máxima prioridad."
    },
    {
      imagen: imgConfianza,
      titulo: "Confianza y Transparencia",
      desc: "Brindamos diagnósticos claros, presupuestos transparentes y comunicación directa con los tutores."
    },
    {
      imagen: imgProfesionalismo,
      titulo: "Profesionalismo Médico",
      desc: "Contamos con equipamiento actualizado y nos mantenemos en constante capacitación profesional."
    }
  ];

  return (
    <section className="container seccion-valores my-5">
      <h3 className="titulo-seccion text-center mb-4" style={{ color: '#0b2545', fontWeight: 'bold' }}>
        Nuestros Valores Principales
      </h3>
      <div className="row g-4">
        {listaValores.map((v, idx) => (
          <div key={idx} className="col-md-4">
            <div className="tarjeta-valor text-center p-4 bg-white rounded shadow-sm border h-100">
              <div className="mb-3">
                <img 
                  src={v.imagen} 
                  alt={v.titulo} 
                  className="img-fluid rounded-circle shadow-sm" 
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                />
              </div>
              <h4 className="fw-bold" style={{ color: '#0b2545', fontSize: '1.25rem' }}>{v.titulo}</h4>
              <p className="text-muted small m-0">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}