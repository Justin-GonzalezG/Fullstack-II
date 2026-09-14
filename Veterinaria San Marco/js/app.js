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

/* Validaciones de crear y iniciar sesion */

const formRegistro = document.getElementById("formulario-registro");
const formLogin = document.getElementById("formulario-login");
const formCitas = document.getElementById("formulario-citas");
    
const btnReservar = document.getElementById("btn-reservar");
const avisoSesion = document.getElementById("aviso-sesion");

const botonesAgregar = document.querySelectorAll(".boton-agregar");
const contadorServicios = document.getElementById("contador-servicios");
const ultimoProducto = document.getElementById("ultimo-producto");

let contador = 0;

const usuarioActivo = localStorage.getItem("usuarioLogueado");

if (usuarioActivo) {

    btnReservar.disable = false;
    avisoSesion.textContent = "Sesión Iniciada como: " + usuarioActivo;
    avisoSesion.style.color = "green";

} else {

    btnReservar.disable = true;
    avisoSesion.textContent = "Debes iniciar sesión para agendar.";
    avisoSesion.style.color = "red";

}

formRegistro.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("registro-nombre").value;
    const email = document.getElementById("registro-email").value;
    const password = document.getElementById("registro-password").value;

    localStorage.setItem("nombreRegistrado", nombre);
    localStorage.setItem("emailRegistrado", email);
    localStorage.setItem("passwordRegistrado", password);

    alert("Cuenta creada con exito. Ahora puedes iniciar la sesión.");
    formRegistro.reset();
});

formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const emailLogin = document.getElementById("login-email").value;
    const passwordLogin = document.getElementById("login-password").value;

    const emailGuardado = localStorage.getItem("emailRegistrado");
    const passwordGuardado = localStorage.getItem("passwordRegistrado");
    const nombreGuardado = localStorage.getItem("nombreRegistrado");
    
});
