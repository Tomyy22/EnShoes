import { cargarProductosCarrito } from "./carrito-utils/cargarProductosCarrito.js";
import { comprarCarrito } from "./carrito-utils/comprarCarrito.js";
import { vaciarCarrito } from "./carrito-utils/vaciarCarrito.js";

const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const linkComprar = document.querySelector(".link-comprar");

cargarProductosCarrito();
botonVaciar.addEventListener("click", vaciarCarrito);

function generarLink() {
    const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        const mensajeProductos = productosEnCarrito.map(producto => {
            const partesRutaImagen = producto.imagen.split('/');
            const rutaCodificada = partesRutaImagen.map(parte => encodeURIComponent(parte)).join('/');
            
            return `Producto: ${producto.titulo} - Talle: ${producto.talle} - Imagen: ${window.location.origin}/${rutaCodificada}`;
        }).join(" / ");
        
        const mensajeWhatsApp = `Quiero Comprar en En-Shoes 😎🔥👟 - ${mensajeProductos}`;
        const urlWhatsApp = `https://wa.me/543407441094?text=${encodeURIComponent(mensajeWhatsApp)}`;
        document.querySelector(".link-comprar").setAttribute("href", urlWhatsApp);
    }
}








function handleComprarClick() {
    generarLink();
    setTimeout(() => {
        comprarCarrito();
    }, 1000); 
}

botonComprar.addEventListener("click",handleComprarClick);
