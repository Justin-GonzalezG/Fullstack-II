
/* Titulo y Cambio de titulo */

const titulo = document.getElementById("titulo-sitio");
titulo.textContent = "Veterinaria San Marcos - Atención Profesional";
console.log(titulo)

/* Comntador del Servicio y validaciones */

const botonesAgregar = document.querySelectorAll(".boton-agregar");
const contadorServicios = document.getElementById("contador-servicios");
const ultimoServicio = document.getElementById("ultimo-producto");

let cantidadServicio = 0;
let contador = 0;

const formRegistro = document.getElementById("formulario-registro");
const formLogin = document.getElementById("formulario-login");
const formCitas = document.getElementById("formulario-citas");
    
const btnReservar = formCitas ? formCitas.querySelector("button[type='submit']") : null;
let avisoSesion = document.getElementById("aviso-sesion");

if (!avisoSesion && btnReservar) {
    avisoSesion = document.createElement("div");
    avisoSesion.id = "aviso-sesion";
    avisoSesion.className = "mb-3 fw-bold text-center";
    btnReservar.before(avisoSesion);
}

const usuarioActivo = localStorage.getItem("usuarioLogueado");

if (usuarioActivo) {
    if (btnReservar) btnReservar.disabled = false;
    if (avisoSesion) {
        avisoSesion.textContent = "Sesión Iniciada como: " + usuarioActivo;
        avisoSesion.style.color = "green";
    }
} else {
    if (btnReservar) btnReservar.disabled = true;
    if (avisoSesion) {
        avisoSesion.textContent = "Debes iniciar sesión para agendar.";
        avisoSesion.style.color = "red";
    }
}

/* Validaciones de crear y iniciar sesion */

if (formRegistro) {
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
}

if (formLogin) {
    formLogin.addEventListener("submit", function(e) {
        e.preventDefault();

        const emailLogin = document.getElementById("login-email").value;
        const passwordLogin = document.getElementById("login-password").value;

        const emailGuardado = localStorage.getItem("emailRegistrado");
        const passwordGuardado = localStorage.getItem("passwordRegistrado");
        const nombreGuardado = localStorage.getItem("nombreRegistrado");
       
        if (emailLogin === emailGuardado && passwordLogin === passwordGuardado) {
            
            localStorage.setItem("usuarioLogueado", nombreGuardado);
            alert("Bienvenido " + nombreGuardado);
            window.location.reload();

        } else {

            alert("Correo o contraseña incorrectos, o la cuenta no existe.");

        }
    });
}

botonesAgregar.forEach(function(boton) {
    boton.addEventListener("click", function(e) {

        if (!localStorage.getItem("usuarioLogueado")) {
            alert("Debes iniciar sesión para seleccionar los Servicios.");
            return;
        }

        const nombreServicio = e.target.getAttribute("data-servicios");
        cantidadServicio = cantidadServicio + 1;
        contador++;

        if (contadorServicios) contadorServicios.textContent = cantidadServicio;
        if (ultimoServicio) ultimoServicio.textContent = nombreServicio + " fue agregado correctamente.";
    });
});

/* Validacion de Formulario de Citas */

if (formCitas) {
    formCitas.addEventListener("submit", function(evento) {
        evento.preventDefault();

        if (!localStorage.getItem("usuarioLogueado")) {
            alert("Acción Denegada. Debes iniciar sesión para agendar.");
            return;
        }

        const campoFecha = document.getElementById("agendar");
        const campoHorario = document.getElementById("horario");
        const mensajeResultado = document.getElementById("mensaje-resultado");

        const fecha = campoFecha.value;
        const horario = campoHorario.value;

        if (
            fecha === "" ||
            horario === ""
        ) {
            if (mensajeResultado) {
                mensajeResultado.textContent = "Debe completar todos los campos del formulario";
                mensajeResultado.className = "alert alert-danger mt-4";
            } else {
                alert("Debe completar todos los campos del formulario");
            }
            return;
        }

        if (mensajeResultado) {
            mensajeResultado.textContent = 
                "Cita confirmada para el día " + fecha + " a las " + horario;
            mensajeResultado.className = "alert alert-success mt-4";
        } else {
            alert("Cita agendada con exito para el " + fecha + " a las " + horario + " hrs.");
        }

        formCitas.reset();
    });
}
