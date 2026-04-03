
const cargarCategorias = () => {

  const contenedor = document.getElementById("lista-categorias");

  categorias.forEach((categoria) => {

    const li = document.createElement("li");
    li.innerHTML = `<a href="#">${categoria}</a>`;

    contenedor.appendChild(li);
  });
};

const cargarProductos = () => {

  const contenedor = document.getElementById("contenedor-productos");

  productos.forEach((producto) => {

    const article = document.createElement("article");
    article.classList.add("producto-card");

    article.innerHTML = `
      <img
        src="${producto.imagen}"
        alt="${producto.nombre}"
        class="producto-card__imagen"
      />
      <div class="producto-card__info">
        <h3 class="producto-card__nombre">${producto.nombre}</h3>
        <p class="producto-card__descripcion">${producto.descripcion}</p>
        <p class="producto-card__precio">
          $${producto.precio.toLocaleString("es-AR")}
        </p>
        <button
          class="producto-card__btn"
          onclick="agregarAlCarrito('${producto.nombre}')"
        >
          Agregar al carrito
        </button>
      </div>
    `;

    contenedor.appendChild(article);
  });
};


// Función del botón "Agregar" 
const agregarAlCarrito = (nombreProducto) => {
  alert(`✅ "${nombreProducto}" fue agregado al carrito.`);
};

// Iniciar la app: llamo a las dos funciones
cargarCategorias();
cargarProductos();
