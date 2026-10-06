import React from 'react';

export default function Testimonios() {
  const listaTestimonios = [
    {
      id: 1,
      nombre: "Camila Valenzuela",
      mascota: "Dueña de 'Firulais' (Golden Retriever)",
      comentario: "Excelente atención en la Veterinaria San Marcos. Lleve a mi perrito de urgencia y el equipo fue súper profesional y cariñoso con él. 100% recomendados.",
      estrellas: "⭐⭐⭐⭐⭐"
    },
    {
      id: 2,
      nombre: "Esteban Morales",
      mascota: "Dueño de 'Luna' (Gata Siamesa)",
      comentario: "Me encanta el sistema de reservas y cómo puedo ver las vacunas de mi gatita en el perfil. Las instalaciones están súper limpias y ordenadas.",
      estrellas: "⭐⭐⭐⭐⭐"
    },
    {
      id: 3,
      nombre: "Daniela Soto",
      mascota: "Dueña de 'Rocky' (Bulldog Francés)",
      comentario: "El servicio de peluquería canina dejó a Rocky hermoso y con un muy buen trato. Da gusto encontrar una veterinaria tan completa en la zona.",
      estrellas: "⭐⭐⭐⭐⭐"
    }
  ];

  return (
    <section className="container my-5 py-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: '#0b2545' }}>Lo que dicen nuestros clientes</h2>
        <p className="text-muted">Conoce las experiencias de quienes confían el cuidado de sus mascotas en nosotros.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {listaTestimonios.map((t) => (
          <div key={t.id} className="col-md-4">
            <div className="card shadow-sm border-0 h-100 p-3">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="mb-2 fs-5">{t.estrellas}</div>
                  <p className="card-text text-muted fst-italic">"{t.comentario}"</p>
                </div>
                <div className="mt-4 pt-3 border-top">
                  <h6 className="mb-0 fw-bold text-primary">{t.nombre}</h6>
                  <small className="text-muted">{t.mascota}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}