/* Titulo y Cambio de titulo */

const titulo = document.getElementById("titulo-sitio");
titulo.textContent = "Veterinaria San Marcos - Atención Profesional";
console.log(titulo);

/* Comntador del Servicio */

const botonesAgregar = document.querySelectorAll(".boton-agregar");
const contadorServicios = document.getElementById("contador-servicios");
const ultimoServicio = document.getElementById("ultimo-producto");

let cantidadServicio = 0;

botonesAgregar.forEach(function(boton) {
    boton.addEventListener("click", function() {

        const nombreServicio = boton.dataset.servicios;
        cantidadServicio = cantidadServicio + 1;
        contadorServicios.textContent = cantidadServicio;

        ultimoServicio.textContent = nombreServicio + " fue agregado correctamente.";
    });
});

/* Validacion de Formulario de Citas */

const formularioCitas = document.getElementById("formulario-citas");
const campoNombre = document.getElementById("nombre");
const campoEmail = document.getElementById("email");
const campoContrasena = document.getElementById("contraseña");
const campoFecha = document.getElementById("agendar");
const campoHorario = document.getElementById("horario");
const mensajeResultado = document.getElementById("mensaje-resultado");

formularioCitas.addEventListener("submit", function(evento) {
    
    evento.preventDefault();

    const nombre = campoNombre.value.trim();
    const email = campoEmail.value.trim();
    const contrasena = campoContrasena.value.trim();
    const fecha = campoFecha.value;
    const horario = campoHorario.value;

    if (
        nombre === "" ||
        email === "" ||
        contrasena === "" ||
        fecha === "" ||
        horario === ""
    ) {
        mensajeResultado.textContent = "Debe completar todos los campos del formulario";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        mensajeResultado.textContent = "Por favor, ingrese un correo electrónico válido";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }

    mensajeResultado.textContent = 
        "Cita confirmada para " + nombre + " el día " + fecha + " a las " + horario;
    mensajeResultado.className = "alert alert-success mt-4";

    formularioCitas.reset();
})
