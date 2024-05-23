import { eliminarDelCarrito } from "./eliminarDelCarrito.js";

export function actualizarBotonesEliminar() {
  let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}
