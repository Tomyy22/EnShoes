import { agregarAlCarrito } from "./agregarAlCarrito.js";


export function actualizarBotonesAgregar() {
    let botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", agregarAlCarrito);
    });
  }