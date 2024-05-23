
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

export function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    total.innerText = `$${totalCalculado}`;
  }