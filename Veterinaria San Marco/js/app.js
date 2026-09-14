
/* Titulo y Cambio de titulo */

const titulo = document.getElementById("titulo-sitio");
titulo.textContent = "Veterinaria San Marcos - Atención Profesional";
console.log(titulo);

/* Comntador del Servicio y validaciones */

const botonesAgregar = document.querySelectorAll(".boton-agregar");
const contadorServicios = document.getElementById("contador-servicios");
const ultimoServicio = document.getElementById("ultimo-producto");
const ultimoServicio = ultimoProducto;

let cantidadServicio = 0;
let contador = 0;

const formRegistro = document.getElementById("formulario-registro");
const formLogin = document.getElementById("formulario-login");
const formCitas = document.getElementById("formulario-citas");
    
const btnReservar = document.getElementById("btn-reservar");
const avisoSesion = document.getElementById("aviso-sesion");

const usuarioActivo = localStorage.getItem("usuarioLogueado");

if (usuarioActivo) {

    btnReservar.disabled = false;
    avisoSesion.textContent = "Sesión Iniciada como: " + usuarioActivo;
    avisoSesion.style.color = "green";

} else {

    btnReservar.disabled = true;
    avisoSesion.textContent = "Debes iniciar sesión para agendar.";
    avisoSesion.style.color = "red";

}

/* Validaciones de crear y iniciar sesion */

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

botonesAgregar.forEach(function(boton) {
    boton.addEventListener("click", function() {

        const nombreServicio = boton.dataset.servicios;
        cantidadServicio = cantidadServicio + 1;
        contadorServicios.textContent = cantidadServicio;

        ultimoServicio.textContent = nombreServicio + " fue agregado correctamente.";
    });
});

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

botonesAgregar.forEach(function(boton) {
    boton.addEventListener("click", function(e) {

        if (!localStorage.getItem("usuarioLogueado")) {
            alert("Debes iniciar sesión para seleccionar los Servicios.");
            return;
        }

        const nombreServicio = e.target.getAttribute("data-servicios");
        cantidadServicio = cantidadServicio + 1;
        contador++;

        contadorServicios.textContent = cantidadServicio;
        ultimoProducto.textContent = nombreServicio + " fue agregado correctamente.";
    });
});

/* Validacion de Formulario de Citas */

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
   
    if (emailLogin === emailGuardado && passwordLogin === passwordGuardado) {
        
        localStorage.setItem("usuarioLogueado", nombreGuardado);
        alert("Bienvenido " + nombreGuardado);
        window.location.reload();

    } else {

        alert("Correo o contraseña incorrectos, o la cuenta no existe.");

    }
});

botonesAgregar.forEach(function(boton) {
    boton.addEventListener("click", function(e) {

        if (!localStorage.getItem("usuarioLogueado")) {
            alert("Debes iniciar sesión para seleccionar los Servicios.");
            return;
        }

        const nombreServicio = e.target.getAttribute("data-servicios");
        contador++;

        contadorServicios.textContent = contador;
        ultimoProducto.textContent = "Seleccionado: " + nombreServicio;
    });
});

formCitas.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!localStorage.getItem("usuarioLogueado")) {
        alert("Acción Denegada. Debes iniciar sesión para agrndar.");
        return;
    }

    const fecha = document.getElementById("agendar").value;
    const hora = document.getElementById("horario").value;

    if (fecha == "" || hora == "") {
        alert("Debe seleccionar una Fecha y Horario.");
        return;
    }

    alert("Cita agendada con exito para el " + fecha + " a las " + hora + " hrs.");
    formCitas.reset();
});
