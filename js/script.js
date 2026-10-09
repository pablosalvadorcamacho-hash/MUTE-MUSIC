// MENÚ MOBILE
var botonMenu = document.querySelector(".home-menu-btn, .cartel-menu-btn");
var navegacion = document.querySelector(".home-nav, .cartel-nav");

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
var canales = document.querySelectorAll(".home-canal, .cartel-canal");
var descripcionCanal = document.querySelector(".home-canal-descripcion, .cartel-canal-descripcion");

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
        formulario.reset();
        confirmacion.showModal();

    })

    // CERRAR AL PULSAR ACEPTAR
    aceptar.addEventListener("click", function () {
        confirmacion.close();
    })

}


// PRECIOS Y FECHAS
var tiposEntrada = [
    {
        id: "tickets-general",
        nombre: "General",
        abono: 59,
        dia: 25
    },
    {
        id: "tickets-menores",
        nombre: "Menores",
        abono: 35,
        dia: 15
    },
    {
        id: "tickets-discapacidad",
        nombre: "Personas con discapacidad",
        abono: 35,
        dia: 15
    }
]

var fechasEntrada = {
    abono: "Abono · 18, 19 y 20 de junio",
    viernes: "Viernes · 18 de junio",
    sabado: "Sábado · 19 de junio",
    domingo: "Domingo · 20 de junio"
}


// RECUPERAR EL CARRITO GUARDADO
var carrito = [];

try {

    var guardado = JSON.parse(localStorage.getItem("mute-carrito"));

    if (Array.isArray(guardado)) {

        carrito = guardado.filter(function (entrada) {

            return entrada &&
                Number.isInteger(entrada.tipo) &&
                entrada.tipo >= 0 &&
                entrada.tipo < tiposEntrada.length &&
                
                fechasEntrada[entrada.fecha] &&
                
                Number.isInteger(entrada.cantidad) &&
                entrada.cantidad > 0;

        })

    }

} catch (error) {
    carrito = [];
}


// ELEMENTOS DEL CARRITO
var botonCarrito = document.querySelector(".home-carrito-btn, .cartel-carrito-btn");
var ventanaCarrito = document.querySelector(".home-carrito, .cartel-carrito");
var cerrarCarrito = document.querySelector(".home-carrito-cerrar, .cartel-carrito-cerrar");

var listaCarrito = document.querySelector("#carrito-lista");
var vacioCarrito = document.querySelector("#carrito-vacio");
var totalCarrito = document.querySelector("#carrito-total");
var pagarCarrito = document.querySelector("#carrito-pagar");
var avisoCarrito = document.querySelector("#carrito-aviso");


// ELEMENTOS DE TICKETS
var selectorFecha = document.querySelector("#tickets-fecha");
var cantidades = document.querySelectorAll(".tickets-cantidad");
var totalTickets = document.querySelector("#tickets-total");
var anadirTickets = document.querySelector("#tickets-anadir");
var avisoTickets = document.querySelector("#tickets-aviso");

var comprarTickets = document.querySelector("#tickets-comprar");
var totalPago = document.querySelector("#tickets-carrito-total");

var ventanaCompra = document.querySelector("#tickets-compra");
var tituloCompra = document.querySelector("#tickets-compra-titulo");
var listaCompra = document.querySelector("#tickets-compra-lista");
var totalCompra = document.querySelector("#tickets-compra-total");
var avisoCompra = document.querySelector("#tickets-compra-aviso");
var confirmarCompra = document.querySelector("#tickets-confirmar");
var cerrarCompra = document.querySelector("#tickets-compra-cerrar");


// OBTENER EL PRECIO DE UNA ENTRADA
function precioEntrada(entrada) {

    var tipo = tiposEntrada[entrada.tipo];

    if (entrada.fecha === "abono") {
        return tipo.abono;
    }

    return tipo.dia;

}


// TEXTO DE UNA LÍNEA DEL CARRITO
function textoEntrada(entrada) {

    return entrada.cantidad + " x " +
        tiposEntrada[entrada.tipo].nombre + " · " +
        fechasEntrada[entrada.fecha] + " - " +
        entrada.cantidad * precioEntrada(entrada) + " €";

}


// SUMAR TODO EL CARRITO
function calcularCarrito() {

    var total = 0;

    carrito.forEach(function (entrada) {
        total = total + entrada.cantidad * precioEntrada(entrada);
    })

    return total;

}


// GUARDAR ANTES DE CAMBIAR EL CARRITO
function guardarCarrito(nuevoCarrito) {

    try {

        localStorage.setItem(
            "mute-carrito",
            JSON.stringify(nuevoCarrito)
        );

        carrito = nuevoCarrito;
        return true;

    } catch (error) {
        return false;
    }

}


// ACTUALIZAR EL CARRITO Y EL TOTAL DE COMPRA
function mostrarCarrito() {

    var total = calcularCarrito();

    if (listaCarrito) {

        listaCarrito.textContent = "";
        avisoCarrito.textContent = "";

        carrito.forEach(function (entrada, posicion) {

            var linea = document.createElement("li");
            var texto = document.createElement("span");
            var eliminar = document.createElement("button");

            texto.textContent = textoEntrada(entrada);

            eliminar.type = "button";
            eliminar.className = "carrito-eliminar";
            eliminar.textContent = "Eliminar";
            eliminar.setAttribute(
                "aria-label",
                "Eliminar " + tiposEntrada[entrada.tipo].nombre +
                " · " + fechasEntrada[entrada.fecha]
            )

            eliminar.addEventListener("click", function () {

                var nuevoCarrito = carrito.filter(
                    function (elemento, indice) {
                        return indice !== posicion;
                    }
                )

                if (guardarCarrito(nuevoCarrito)) {
                    mostrarCarrito();
                } else {
                    avisoCarrito.textContent =
                        "No se ha podido actualizar el carrito.";
                }

            });

            linea.appendChild(texto);
            linea.appendChild(eliminar);
            listaCarrito.appendChild(linea);

        })

        vacioCarrito.hidden = carrito.length > 0;
        pagarCarrito.hidden = carrito.length === 0;
        totalCarrito.textContent = total + " €";

    }

    if (totalPago && comprarTickets) {
        totalPago.textContent = total + " €";
        comprarTickets.disabled = carrito.length === 0;
    }

}


// ABRIR Y CERRAR EL CARRITO
if (botonCarrito && ventanaCarrito && cerrarCarrito) {

    botonCarrito.addEventListener("click", function () {
        mostrarCarrito();
        ventanaCarrito.showModal();
    })

    cerrarCarrito.addEventListener("click", function () {
        ventanaCarrito.close();
    })

}


// SELECCIÓN DE ENTRADAS EN TICKETS
if (selectorFecha && totalTickets && anadirTickets) {

    function actualizarSeleccion() {

        var total = 0;

        cantidades.forEach(function (cantidad) {

            total = total +
                Number(cantidad.value) *
                Number(cantidad.getAttribute("data-precio"));

        })

        totalTickets.textContent = total + " €";
        anadirTickets.disabled = total === 0;

    }


    // CAMBIAR PRECIOS Y TEXTOS SEGÚN LA FECHA
    function actualizarFecha() {

        var esAbono = selectorFecha.value === "abono";

        var titulo = document.querySelector("#tickets-titulo");

        titulo.textContent = esAbono
            ? "ABONOS PARA LOS TRES DÍAS"
            : "ENTRADAS · " + fechasEntrada[selectorFecha.value];

        tiposEntrada.forEach(function (tipo) {

            var selector = document.getElementById(tipo.id);
            var tarjeta = selector.closest(".tickets-tarjeta");
            var precio = esAbono ? tipo.abono : tipo.dia;

            selector.setAttribute("data-precio", precio);

            tarjeta.querySelector(".tickets-precio").textContent =
                precio + " €";

            var incluye = tarjeta.querySelector(".tickets-incluye li");

            if (incluye) {
                incluye.textContent = esAbono
                    ? "Acceso los tres días del festival"
                    : "Acceso el " + fechasEntrada[selectorFecha.value];
            }

        })

        avisoTickets.textContent = "";
        actualizarSeleccion();

    }

    selectorFecha.addEventListener("change", actualizarFecha);

    cantidades.forEach(function (cantidad) {
        cantidad.addEventListener("change", actualizarSeleccion);
    })


    // AÑADIR LA SELECCIÓN SIN BORRAR LO ANTERIOR
    anadirTickets.addEventListener("click", function () {

        var nuevoCarrito = carrito.map(function (entrada) {

            return {
                tipo: entrada.tipo,
                fecha: entrada.fecha,
                cantidad: entrada.cantidad
            }

        })

        var unidadesAnadidas = 0;

        tiposEntrada.forEach(function (tipo, indice) {

            var selector = document.getElementById(tipo.id);
            var unidades = Number(selector.value);

            if (unidades > 0) {

                var existente = nuevoCarrito.find(function (entrada) {

                    return entrada.tipo === indice &&
                        entrada.fecha === selectorFecha.value;

                })

                if (existente) {

                    existente.cantidad =
                        existente.cantidad + unidades;

                } else {

                    nuevoCarrito.push({
                        tipo: indice,
                        fecha: selectorFecha.value,
                        cantidad: unidades
                    })

                }

                unidadesAnadidas = unidadesAnadidas + unidades;

            }

        })

        if (unidadesAnadidas === 0) {
            return;
        }

        if (!guardarCarrito(nuevoCarrito)) {

            avisoTickets.textContent =
                "No se ha podido guardar el carrito. " +
                "Comprueba que el navegador permite almacenar datos.";

            return;

        }

        cantidades.forEach(function (cantidad) {
            cantidad.value = "0";
        })

        actualizarSeleccion();
        mostrarCarrito();

        avisoTickets.textContent =
            "Entradas añadidas al carrito. " +
            "Puedes elegir otra fecha o finalizar la compra.";

    })

    actualizarFecha();

}


// REVISAR Y CONFIRMAR LA COMPRA DEL CARRITO
if (comprarTickets && ventanaCompra && confirmarCompra && cerrarCompra) {

    comprarTickets.addEventListener("click", function () {

        if (carrito.length === 0) {
            return;
        }

        tituloCompra.textContent = "REVISA TUS ENTRADAS";
        listaCompra.textContent = "";

        carrito.forEach(function (entrada) {

            var linea = document.createElement("li");
            linea.textContent = textoEntrada(entrada);
            listaCompra.appendChild(linea);

        })

        totalCompra.textContent = calcularCarrito() + " €";

        avisoCompra.textContent =
            "Revisa tus entradas antes de confirmar la compra.";

        confirmarCompra.hidden = false;
        cerrarCompra.textContent = "VOLVER";

        ventanaCompra.showModal();

    })


    confirmarCompra.addEventListener("click", function () {

        if (carrito.length === 0) {
            return;
        }

        if (!guardarCarrito([])) {

            avisoCompra.textContent =
                "No se ha podido completar la operación. Inténtalo de nuevo.";

            return;

        }

        mostrarCarrito();

        tituloCompra.textContent = "¡COMPRA CONFIRMADA!";

        avisoCompra.textContent =
            "¡Compra realizada con éxito! " +
            "Gracias por formar parte de MUTE MUSIC.";

        confirmarCompra.hidden = true;
        cerrarCompra.textContent = "ACEPTAR";
        cerrarCompra.focus();

    })


    cerrarCompra.addEventListener("click", function () {
        ventanaCompra.close();
    })

}

// MOSTRAR LOS DATOS GUARDADOS AL CARGAR LA PÁGINA
mostrarCarrito();


// CERRAR EL CARRITO Y CONTINUAR A LA COMPRA
if (pagarCarrito && ventanaCarrito) {

    pagarCarrito.addEventListener("click", function (evento) {

        evento.preventDefault();

        var destino = pagarCarrito.href;

        var salida = ventanaCarrito.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ],
            {
                duration: 200,
                easing: "ease-out"
            }
        )

        salida.onfinish = function () {

            ventanaCarrito.close();
            window.location.href = destino;

        }

    })

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
            })

            gridsDia.forEach(function (grid) {
                grid.classList.remove("active");
            })

            boton.classList.add("active");

            var gridObjetivo = document.querySelector("#dia-" + diaSeleccionado);
            if (gridObjetivo) {
                gridObjetivo.classList.add("active");
            }

        })

    })

}


// VISOR DE FOTOS (9 FOTOS)
var tarjetasFotos = document.querySelectorAll(".gallery-tarjeta-foto");
var visorModal = document.getElementById("gallery-visor-modal");

if (visorModal && tarjetasFotos.length > 0) {

    var visorImg = document.getElementById("gallery-visor-img");
    var visorTitulo = document.getElementById("gallery-visor-titulo");
    var visorDescripcion = document.getElementById("gallery-visor-descripcion");
    var visorContador = document.getElementById("gallery-visor-contador");
    var botonCerrar = document.querySelector(".gallery-visor-cerrar");
    var botonAnterior = document.querySelector(".gallery-visor-anterior");
    var botonSiguiente = document.querySelector(".gallery-visor-siguiente");
    var fondoVisor = document.querySelector(".gallery-visor-fondo");

    var datosFotos = [
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
    ]

    var indiceActual = 0;

    function actualizarContenidoVisor() {
        var tarjeta = tarjetasFotos[indiceActual];
        var datos = datosFotos[indiceActual];

        visorImg.src = tarjeta.querySelector("img").src;
        visorTitulo.textContent = datos.title;
        visorDescripcion.textContent = datos.desc;
        visorContador.textContent = (indiceActual + 1) + " / " + datosFotos.length;
    }

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

    tarjetasFotos.forEach(function (tarjeta, indice) {
        tarjeta.addEventListener("click", function () {
            abrirVisor(indice);
        })
    })

    botonSiguiente.addEventListener("click", function () {
        indiceActual = (indiceActual + 1) % tarjetasFotos.length;
        actualizarContenidoVisor();
    })

    botonAnterior.addEventListener("click", function () {
        indiceActual = (indiceActual - 1 + tarjetasFotos.length) % tarjetasFotos.length;
        actualizarContenidoVisor();
    })

    botonCerrar.addEventListener("click", cerrarVisor);
    fondoVisor.addEventListener("click", cerrarVisor);

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && visorModal.classList.contains("active")) {
            cerrarVisor();
        }
    })

}