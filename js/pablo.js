// MENÚ MOBILE
var botonMenu = document.querySelector(".home-menu-btn");
var navegacion = document.querySelector(".home-nav");

if (botonMenu && navegacion) {

    botonMenu.addEventListener("click", function () {

        var abierto = navegacion.classList.toggle("active");

        botonMenu.classList.toggle("active", abierto);
        botonMenu.setAttribute("aria-expanded", abierto);

        if (abierto) {
            botonMenu.setAttribute("aria-label", "Cerrar menú");
        } else {
            botonMenu.setAttribute("aria-label", "Abrir menú");
        }

    })

    // CERRAR EL MENÚ AL ELEGIR UN ENLACE
    var enlacesMenu = navegacion.querySelectorAll("a");

    enlacesMenu.forEach(function (enlace) {

        enlace.addEventListener("click", function () {

            navegacion.classList.remove("active");
            botonMenu.classList.remove("active");

            botonMenu.setAttribute("aria-expanded", "false");
            botonMenu.setAttribute("aria-label", "Abrir menú");

        })

    })

}


// CANALES DEL FESTIVAL
var canales = document.querySelectorAll(".home-canal");
var descripcionCanal = document.querySelector(".home-canal-descripcion");

if (descripcionCanal) {

    canales.forEach(function (canal) {

        canal.addEventListener("click", function () {

            canales.forEach(function (otroCanal) {
                otroCanal.classList.remove("active");
                otroCanal.setAttribute("aria-pressed", "false");
            })

            canal.classList.add("active");
            canal.setAttribute("aria-pressed", "true");

            descripcionCanal.textContent = canal.getAttribute("data-texto");

        })

    })

}


// ABRIR Y CERRAR EL CARRITO
var botonCarrito = document.querySelector(".home-carrito-btn");
var ventanaCarrito = document.querySelector(".home-carrito");
var cerrarCarrito = document.querySelector(".home-carrito-cerrar");

if (botonCarrito && ventanaCarrito && cerrarCarrito) {

    botonCarrito.addEventListener("click", function () {
        ventanaCarrito.showModal();
    })

    cerrarCarrito.addEventListener("click", function () {
        ventanaCarrito.close();
    })

}


// FORMULARIO DE CONTACTO
var formulario = document.querySelector(".home-formulario");
var confirmacion = document.querySelector(".home-confirmacion");
var aceptar = document.querySelector(".home-confirmacion-cerrar");

if (formulario && confirmacion && aceptar) {

    var nombre = document.querySelector("#home-nombre");
    var email = document.querySelector("#home-email");
    var mensaje = document.querySelector("#home-mensaje");
    var aviso = document.querySelector(".home-formulario-aviso");

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        if (nombre.value.trim() === "") {
            aviso.textContent = "Escribe tu nombre.";
            nombre.focus();
            return;
        }

        if (email.value.trim() === "" || !email.validity.valid) {
            aviso.textContent = "Escribe un correo electrónico válido.";
            email.focus();
            return;
        }

        if (mensaje.value.trim() === "") {
            aviso.textContent = "Escribe tu mensaje.";
            mensaje.focus();
            return;
        }

        // QUITAR EL AVISO ANTERIOR Y ABRIR LA CONFIRMACIÓN
        aviso.textContent = "";
        confirmacion.showModal();

    })

    // CERRAR AL PULSAR ACEPTAR
    aceptar.addEventListener("click", function () {
        confirmacion.close();
    })

}


// REPETIR LA ANIMACIÓN AL ABRIR LOS FAQ
var preguntas = document.querySelectorAll(".home-faq details");

preguntas.forEach(function (pregunta) {

    pregunta.addEventListener("toggle", function () {

        if (pregunta.open) {

            var respuesta = pregunta.querySelector("p");

            respuesta.animate(
                [
                    { opacity: 0, transform: "translateY(-5px)" },
                    { opacity: 1, transform: "translateY(0)" }
                ],
                {
                    duration: 250,
                    easing: "ease-out"
                }
            );

        }

    })

})