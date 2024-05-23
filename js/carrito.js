import { cargarProductosCarrito } from "./carrito-utils/cargarProductosCarrito.js";
import { comprarCarrito } from "./carrito-utils/comprarCarrito.js";
import { vaciarCarrito } from "./carrito-utils/vaciarCarrito.js";

const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

cargarProductosCarrito();
botonVaciar.addEventListener("click", vaciarCarrito);
botonComprar.addEventListener("click", comprarCarrito);
