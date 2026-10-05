import React from 'react';

export default function Valores() {
  return (
    <section id="valores-veterinaria" className="container my-5">
      <h2 id="valores-mensaje" className="text-center" style={{ color: '#0b2545' }}>Nuestros Valores</h2>
      <p id="mensajeValor" className="text-center text-muted">
        Comprometidos con el bienestar y la salud de tus mascotas con profesionalismo y dedicación.
      </p>

      <div className="contenedor-tarjetas mt-4 d-flex justify-content-around flex-wrap gap-3">
        <div className="tarjeta-valores p-3 border rounded shadow-sm bg-white" style={{ width: '300px' }}>
          <h3>Compromiso</h3>
          <p>Brindamos la mejor atención y cuidado veterinario con responsabilidad absoluta.</p>
        </div>
        <div className="tarjeta-valores p-3 border rounded shadow-sm bg-white" style={{ width: '300px' }}>
          <h3>Empatía</h3>
          <p>Amamos a los animales y entendemos el vínculo especial que tienes con ellos.</p>
        </div>
        <div className="tarjeta-valores p-3 border rounded shadow-sm bg-white" style={{ width: '300px' }}>
          <h3>Profesionalismo</h3>
          <p>Contamos con tecnología y personal altamente capacitado para cada diagnóstico.</p>
        </div>
      </div>
    </section>
  );
}