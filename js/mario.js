// MENÚ MOBILE
var botonMenu = document.querySelector(".cartel-menu-btn");
var navegacion = document.querySelector(".cartel-nav");

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
var canales = document.querySelectorAll(".cartel-canal");
var descripcionCanal = document.querySelector(".cartel-canal-descripcion");

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
var botonCarrito = document.querySelector(".cartel-carrito-btn");
var ventanaCarrito = document.querySelector(".cartel-carrito");
var cerrarCarrito = document.querySelector(".cartel-carrito-cerrar");

if (botonCarrito && ventanaCarrito && cerrarCarrito) {

    botonCarrito.addEventListener("click", function () {
        ventanaCarrito.showModal();
    })

    cerrarCarrito.addEventListener("click", function () {
        ventanaCarrito.close();
    })

}


// FORMULARIO DE CONTACTO
var formulario = document.querySelector(".cartel-formulario");
var confirmacion = document.querySelector(".cartel-confirmacion");
var aceptar = document.querySelector(".cartel-confirmacion-cerrar");

if (formulario && confirmacion && aceptar) {

    var nombre = document.querySelector("#cartel-nombre");
    var email = document.querySelector("#cartel-email");
    var mensaje = document.querySelector("#cartel-mensaje");
    var aviso = document.querySelector(".cartel-formulario-aviso");

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


// ABRIR Y CERRAR LAS FAQ FLUIDO
var preguntas = document.querySelectorAll(".cartel-faq details");

preguntas.forEach(function (pregunta) {

    var titulo = pregunta.querySelector("summary");
    var animando = false;

    titulo.addEventListener("click", function (evento) {

        // EVITAR QUE SE ABRA O CIERRE BRUSCO
        evento.preventDefault();

        if (animando) {
            return;
        }

        animando = true;

        var estabaAbierta = pregunta.open;
        var alturaInicial = pregunta.getBoundingClientRect().height;
        var alturaFinal;

        if (estabaAbierta) {

            // ALTURA DEL TÍTULO MÁS BORDE
            alturaFinal = titulo.getBoundingClientRect().height + 1;

        } else {

            pregunta.open = true;
            alturaFinal = pregunta.getBoundingClientRect().height;

        }

        var animacion = pregunta.animate(
            [
                { height: alturaInicial + "px" },
                { height: alturaFinal + "px" }
            ],
            {
                duration: 250,
                easing: "ease-in-out",
                fill: "both"
            }
        )

        animacion.onfinish = function () {

            pregunta.open = !estabaAbierta;
            animacion.cancel();
            animando = false;

        }

    })

})


// CALCULAR EL TOTAL DE LOS ABONOS
var cantidades = document.querySelectorAll(".tickets-cantidad");
var totalTickets = document.querySelector("#tickets-total");

if (totalTickets) {

    function actualizarTotal() {

        var total = 0;

        cantidades.forEach(function (cantidad) {

            var unidades = Number(cantidad.value);
            var precio = Number(cantidad.getAttribute("data-precio"));

            total = total + unidades * precio;

        })

        totalTickets.textContent = total + " €";

    }

    cantidades.forEach(function (cantidad) {

        cantidad.addEventListener("change", actualizarTotal);

    })

    actualizarTotal();

}

document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".cartel-tab-btn");
    const gridDias = document.querySelectorAll(".cartel-grid-escenarios");

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const diaSeleccionado = btn.getAttribute("data-dia");

            // 1. Desactivar todos los botones y activar el pulsado
            tabButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            // 2. Ocultar todos los días y mostrar el seleccionado
            gridDias.forEach((grid) => {
                if (grid.classList.contains(`cartel-${diaSeleccionado}`)) {
                    grid.classList.add("active");
                } else {
                    grid.classList.remove("active");
                }
            });
        });
    });
});

// SELECCIÓN DE DÍAS (PESTAÑAS DEL CARTEL)
var botonesDia = document.querySelectorAll(".cartel-tab-btn");
var gridsDia = document.querySelectorAll(".cartel-grid-escenarios");

if (botonesDia.length > 0 && gridsDia.length > 0) {

    botonesDia.forEach(function (boton) {

        boton.addEventListener("click", function () {

            var diaSeleccionado = boton.getAttribute("data-dia");

            botonesDia.forEach(function (b) {
                b.classList.remove("active");
            });

            gridsDia.forEach(function (grid) {
                grid.classList.remove("active");
            });

            boton.classList.add("active");

            var gridObjetivo = document.querySelector("#dia-" + diaSeleccionado);
            if (gridObjetivo) {
                gridObjetivo.classList.add("active");
            }

        });

    });

}

