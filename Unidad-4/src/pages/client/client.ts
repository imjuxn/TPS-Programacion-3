import { verificarSesion, protegerRuta } from '../../utils/guards';
import { eliminarSesion } from '../../utils/storage';

const usuario = verificarSesion();

if (!usuario || !protegerRuta()) {
  alert('❌ Debes iniciar sesión para acceder');
  window.location.href = '../../index.html';
}

// Mostrar nombre del usuario
const nombreUsuario = document.getElementById('nombre-usuario') as HTMLElement;
if (usuario) {
  nombreUsuario.textContent = usuario.nombre;
}

// Productos de ejemplo
const productos = [
  {
    id: 1,
    nombre: 'Hamburguesa Triple',
    descripcion: 'Triple carne, cheddar derretido y bacon',
    precio: 25000,
    imagen: 'https://via.placeholder.com/250x180?text=Hamburguesa'
  },
  {
    id: 2,
    nombre: 'Pizza Mozzarella',
    descripcion: 'Salsa casera, mozzarella y orégano',
    precio: 18000,
    imagen: 'https://via.placeholder.com/250x180?text=Pizza'
  },
  {
    id: 3,
    nombre: 'Papas Fritas XL',
    descripcion: 'Porción grande con sal y alioli',
    precio: 8000,
    imagen: 'https://via.placeholder.com/250x180?text=Papas'
  },
  {
    id: 4,
    nombre: 'Coca-Cola 500ml',
    descripcion: 'Bebida fría, perfecta para tu pedido',
    precio: 3500,
    imagen: 'https://via.placeholder.com/250x180?text=Coca'
  },
  {
    id: 5,
    nombre: 'Completo Especial',
    descripcion: 'Pan, palta, tomate, cebolla y mayonesa',
    precio: 12000,
    imagen: 'https://via.placeholder.com/250x180?text=Completo'
  },
  {
    id: 6,
    nombre: 'Helado Extremo',
    descripcion: 'Helado de vainilla, chocolate y frutilla',
    precio: 5500,
    imagen: 'https://via.placeholder.com/250x180?text=Helado'
  }
];

// Renderizar productos
const contenedorProductos = document.getElementById('contenedor-productos') as HTMLDivElement;

productos.forEach(producto => {
  const card = document.createElement('div');
  card.className = 'producto-card';
  card.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" />
    <div class="producto-info">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p class="precio">$${producto.precio.toLocaleString('es-AR')}</p>
      <button class="btn-comprar">Agregar al Carrito</button>
    </div>
  `;

  const btnComprar = card.querySelector('.btn-comprar') as HTMLButtonElement;
  btnComprar.addEventListener('click', () => {
    alert(`✅ ${producto.nombre} agregado al carrito`);
  });

  contenedorProductos.appendChild(card);
});

// Cerrar sesión
const btnLogout = document.getElementById('btn-logout') as HTMLButtonElement;
btnLogout.addEventListener('click', () => {
  eliminarSesion();
  window.location.href = '../../index.html';
});
