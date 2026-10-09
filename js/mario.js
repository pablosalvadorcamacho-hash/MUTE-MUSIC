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


////////////////////////////
/////////* GALLERY *////////
////////////////////////////


document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. LÓGICA DEL MAPA CONCEPTUAL INTERACTIVO
    // ==========================================
    const puntosInteres = document.querySelectorAll(".gallery-punto-interes");
    const contenedorDetallesPunto = document.getElementById("gallery-detalles-punto");

    const datosMapa = {
        blue: {
            title: "Blue Frequency",
            desc: "Escenario azul · Electrónica y House. Canal 01 de tus auriculares."
        },
        red: {
            title: "Red Heat",
            desc: "Escenario rojo · Techno de alta intensidad y ritmos contundentes. Canal 02."
        },
        green: {
            title: "Green Groove",
            desc: "Escenario verde · Disco, Funk y sonidos orgánicos. Canal 03 de tus auriculares."
        },
        barras: {
            title: "Zona de Barras",
            desc: "Puntos de hidratación y recarga de pulseras cashless distribuidos en la zona central."
        },
        auriculares: {
            title: "Punto de Auriculares",
            desc: "Recogida y entrega de auriculares inalámbricos. Imprescindible presentar tu entrada."
        },
        acceso: {
            title: "Acceso Principal",
            desc: "Entrada general, validación de tickets y control de seguridad de Caja Mágica."
        }
    };

    puntosInteres.forEach(boton => {
        boton.addEventListener("click", function () {
            puntosInteres.forEach(p => p.classList.remove("active"));
            this.classList.add("active");

            const clavePunto = this.getAttribute("data-punto");
            const datos = datosMapa[clavePunto];

            if (datos && contenedorDetallesPunto) {
                contenedorDetallesPunto.innerHTML = `
                    <h4 class="gallery-titulo-punto">${datos.title}</h4>
                    <p class="gallery-texto-punto">${datos.desc}</p>
                `;
            }
        });
    });

    // ==========================================
    // 2. LÓGICA DE LA GALERÍA Y VISOR MODAL (9 FOTOS)
    // ==========================================
    const tarjetasFotos = document.querySelectorAll(".gallery-tarjeta-foto");
    const visorModal = document.getElementById("gallery-visor-modal");
    const visorImg = document.getElementById("gallery-visor-img");
    const visorTitulo = document.getElementById("gallery-visor-titulo");
    const visorDescripcion = document.getElementById("gallery-visor-descripcion");
    const visorContador = document.getElementById("gallery-visor-contador");
    const botonCerrar = document.querySelector(".gallery-visor-cerrar");
    const botonAnterior = document.querySelector(".gallery-visor-anterior");
    const botonSiguiente = document.querySelector(".gallery-visor-siguiente");
    const fondoVisor = document.querySelector(".gallery-visor-fondo");

    const datosFotos = [
        {
            title: "MILES DE PERSONAS. TU PROPIO MUNDO.",
            desc: "Una multitud conectada a través de frecuencias individuales. Cada asistente vive una experiencia única sumergido en su propia atmósfera auditiva dentro del recinto."
        },
        {
            title: "LA NOCHE TIENE TRES COLORES.",
            desc: "Los canales de tus auriculares iluminan el espacio. Visualiza en tiempo real qué música está escuchando la multitud a tu alrededor mediante el código de luces."
        },
        {
            title: "EL ESCENARIO LO PONES TÚ.",
            desc: "Inmersión total bajo arquitecturas de luz y sonido. La puesta en escena en Caja Mágica transforma el espacio exterior en una pista de baile masiva."
        },
        {
            title: "ENERGÍA EN CADA CANAL.",
            desc: "Bases potentes y frecuencias diseñadas para hacer vibrar al público. Cambia de estilo musical con solo presionar un botón en tu dispositivo."
        },
        {
            title: "CONEXIÓN SIN INTERFERENCIAS.",
            desc: "Sonido de alta fidelidad directamente a tus oídos. Sin límites de volumen acústico exterior, permitiendo la máxima potencia musical durante la madrugada."
        },
        {
            title: "LUCES QUE GUÍAN EL RITMO.",
            desc: "Sincronización óptica entre los shows del escenario principal y la iluminación ambiental que rodea toda la infraestructura del recinto."
        },
        {
            title: "EL ARTE DE CREAR VIBRACIONES.",
            desc: "DJs internacionales transmitiendo simultáneamente en 3 canales distintos desde los escenarios principales de MUTE Madrid."
        },
        {
            title: "DONDE COMIENZA LA MAGIA.",
            desc: "Los primeros destellos al atardecer marcan la apertura de puertas y la entrega de los auriculares inalámbricos para iniciar la jornada."
        },
        {
            title: "HASTA QUE VUELVA A SALIR EL SOL.",
            desc: "Los momentos finales de una velada inolvidable. La comunidad unida celebrando la música electrónica hasta el amanecer."
        }
    ];

    let indiceActual = 0;

    function abrirVisor(indice) {
        indiceActual = indice;
        actualizarContenidoVisor();
        visorModal.classList.add("active");
        visorModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function cerrarVisor() {
        visorModal.classList.remove("active");
        visorModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function actualizarContenidoVisor() {
        const tarjeta = tarjetasFotos[indiceActual];
        const rutaImagen = tarjeta.querySelector("img").src;
        const datos = datosFotos[indiceActual];

        visorImg.src = rutaImagen;
        visorTitulo.textContent = datos.title;
        visorDescripcion.textContent = datos.desc;
        visorContador.textContent = `${indiceActual + 1} / ${datosFotos.length}`;
    }

    tarjetasFotos.forEach((tarjeta, idx) => {
        tarjeta.addEventListener("click", () => abrirVisor(idx));
    });

    botonSiguiente.addEventListener("click", () => {
        indiceActual = (indiceActual + 1) % tarjetasFotos.length;
        actualizarContenidoVisor();
    });

    botonAnterior.addEventListener("click", () => {
        indiceActual = (indiceActual - 1 + tarjetasFotos.length) % tarjetasFotos.length;
        actualizarContenidoVisor();
    });

    // EVENTOS DE CIERRE AÑADIDOS:
    if (botonCerrar) {
        botonCerrar.addEventListener("click", cerrarVisor);
    }

    if (fondoVisor) {
        fondoVisor.addEventListener("click", cerrarVisor);
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && visorModal.classList.contains("active")) {
            cerrarVisor();
        }
    });
    

})