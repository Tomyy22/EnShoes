let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const numero = document.querySelector("#numero");

export function actualizarNumero() {
    let nuevoNumero = productosEnCarrito.reduce(
      (acc, producto) => acc + producto.cantidad,
      0
    );
    numero.innerText = nuevoNumero;
  }
