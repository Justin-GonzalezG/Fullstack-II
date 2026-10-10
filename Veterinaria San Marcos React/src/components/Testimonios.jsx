import React from 'react';

export default function Testimonios() {
  const listaTestimonios = [
    {
      texto: "La atención a mi perrito fue impecable. Lo atendieron de urgencia a tiempo y con mucho cariño.",
      autor: "Carolina Muñoz",
      mascota: "Tutor de 'Max' (Golden Retriever)"
    },
    {
      texto: "Excelente servicio de peluquería y vacunas. Muy amables y profesionales siempre.",
      autor: "Gabriel Silva",
      mascota: "Tutor de 'Misi' (Gato Mestizo)"
    },
    {
      texto: "Siempre me dejan todo muy claro sobre los medicamentos y controles. 100% recomendados en Quilpué.",
      autor: "Isolina Pérez",
      mascota: "Tutora de 'Luna' (Poodle)"
    }
  ];

  return (
    <section className="container seccion-testimonios">
      <h3 className="titulo-seccion">Lo que dicen nuestros clientes</h3>
      <div className="row g-4">
        {listaTestimonios.map((t, idx) => (
          <div key={idx} className="col-md-4">
            <div className="tarjeta-testimonio">
              <p className="texto-testimonio">"{t.texto}"</p>
              <div className="autor-testimonio">
                <div className="avatar-testimonio">
                  {t.autor.charAt(0)}
                </div>
                <div className="info-autor">
                  <h6>{t.autor}</h6>
                  <small>{t.mascota}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}