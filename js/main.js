import { actualizarNumero } from "./main-utils/actualizarNumero.js";
import { cargarProductos } from "./main-utils/cargarProductos.js";




let productos = [];

fetch("./js/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    cargarProductos(productos);
  });

const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");

botonesCategorias.forEach((boton) =>
  boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
  })
);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;
      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumero();
} else {
  productosEnCarrito = [];
}

document.querySelector(".btn-close").addEventListener("click", () => {
  location.reload();
  modalAbierto = false;
});

let gamaSeleccionada = 'todos';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.form-control');
    const gamaButtons = document.querySelectorAll('.boton-categoria');
    searchInput.addEventListener('input', (event) => {
        filtrarYMostrarProductos();
    });

    gamaButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            gamaSeleccionada = event.currentTarget.id;
            document.querySelector('.boton-categoria.active').classList.remove('active');
            event.currentTarget.classList.add('active');
            filtrarYMostrarProductos();
        });
    });
});

function filtrarYMostrarProductos() {
  const searchText = document
    .querySelector(".form-control")
    .value.toLowerCase();
  let filteredProducts = productos.filter((producto) =>
    producto.titulo.toLowerCase().includes(searchText)
  );

  if (gamaSeleccionada !== "todos") {
    filteredProducts = filteredProducts.filter(
      (producto) => producto.categoria.id === gamaSeleccionada
    );
  }

  cargarProductos(filteredProducts);
}
