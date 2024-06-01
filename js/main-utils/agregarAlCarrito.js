import { actualizarNumero } from "./actualizarNumero.js";
import { modalAbierto } from "./cargarProductos.js";

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
let productos = [];
fetch("./js/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
  });


export function agregarAlCarrito(e,talleSeleccionado,imagen) {
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #cb0a01, #961818)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
    },
    offset: {
      x: "1.5rem",
      y: "1.5rem",
    },
    onClick: function () {},
  }).showToast();
  let idBoton = e;
  if (modalAbierto === false) {
    idBoton = e.currentTarget.id;
  }

  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productoAgregado.talle = talleSeleccionado
    productoAgregado.imagen = imagen
    console.log("NO",productoAgregado.imagen);
    productosEnCarrito.push(productoAgregado);
  }
  console.log(productoAgregado);
  actualizarNumero();
  if (!modalAbierto) {
    setTimeout(() => {
      location.reload();
    }, "1000");
  }

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}
