import { actualizarBotonesAgregar } from "./actualizarBotonesAgregar.js";
import { agregarAlCarrito } from "./agregarAlCarrito.js";
export let modalAbierto = false;
export let talleSeleccionado = 0;

export function cargarProductos(productosElegidos) {
  const contenedorProductos = document.getElementById("contenedor-productos");
  contenedorProductos.innerHTML = "";
  productosElegidos.forEach((producto, index) => {
    const div = document.createElement("div");
    const carouselId = producto.id;
    div.classList.add("producto");
    div.innerHTML = `
      <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${Object.keys(producto.imagen)
            .map(
              (key, i) => `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
              <img src="${producto.imagen[key]}" class="d-block w-100 producto-imagen" alt="${producto.titulo}" 
                data-bs-toggle="modal" data-bs-target="#productModal"
                data-img-src="${producto.imagen[key]}"
                data-producto-id="${producto.id}"
                data-producto-nombre="${producto.titulo}"
                data-producto-precio="${producto.precio}"
                data-producto-talle='${JSON.stringify(producto.talle)}'>
            </div>
          `
            )
            .join("")}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>    
      <div class="producto-detalles">
        <h3 class="producto-titulo">${producto.titulo}</h3>
        <p class="producto-precio">$${producto.precio}</p>
      </div>
    `;
    contenedorProductos.appendChild(div);
  });

  actualizarBotonesAgregar();

  document.querySelectorAll(".producto-imagen").forEach((img) => {
    img.addEventListener("click", function () {
      const modalImage = document.getElementById("modalProductImage");
      const modalProductName = document.getElementById("modalProductName");
      const modalProductPrice = document.getElementById("modalProductPrice");
      const modalProductSelectTalle = document.getElementById("modalProductSelectTalle");
      const productoId = this.getAttribute("data-producto-id");
      modalImage.src = this.getAttribute("data-img-src");
      modalProductName.textContent = this.getAttribute("data-producto-nombre");
      modalProductPrice.textContent = `$${this.getAttribute("data-producto-precio")}`;

      const talles = JSON.parse(this.getAttribute("data-producto-talle"));
      modalProductSelectTalle.innerHTML = talles.map(talle => `<option value="${talle}">${talle}</option>`).join("");
      
      talleSeleccionado = talles[0];
      modalProductSelectTalle.addEventListener("change", () => {
        talleSeleccionado = modalProductSelectTalle.value;
      });


      modalAbierto = true;
      const modal = new bootstrap.Modal(document.getElementById("productModal"));
      modal.show();
      console.log(modalImage.getAttribute("src"));
      const botonAgregarEnModal = document.querySelector(".producto-agrega");
      botonAgregarEnModal.addEventListener("click", function () {
        agregarAlCarrito(productoId, talleSeleccionado, modalImage.getAttribute("src"));
      });
    });
  });
}
