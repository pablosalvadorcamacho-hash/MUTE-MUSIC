// SELECCIONA EL BOTÓN Y LA NAVEGACIÓN
var botonMenu = document.querySelector(".home-menu-btn");
var navegacion = document.querySelector(".home-nav");


// ABRE Y CIERRA EL MENÚ
if (botonMenu && navegacion) {

    botonMenu.addEventListener("click", function() {
        navegacion.classList.toggle("active");

    })
}