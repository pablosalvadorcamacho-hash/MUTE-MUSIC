// SELECCIONA EL BOTÓN Y LA NAVEGACIÓN
var botonMenu = document.querySelector(".home-menu-btn");
var navegacion = document.querySelector(".home-nav");


// ABRE Y CIERRA EL MENÚ
if (botonMenu && navegacion) {

    botonMenu.addEventListener("click", function() {
        navegacion.classList.toggle("active");

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


// ABRIR Y CERRAR EL CARRO
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