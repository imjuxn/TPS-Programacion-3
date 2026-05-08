import { verificarSesion, protegerRutaPorRol } from '../../utils/guards';
import { obtenerUsuarios, eliminarSesion } from '../../utils/storage';

const usuario = verificarSesion();

if (!usuario || !protegerRutaPorRol('admin')) {
  alert('❌ No tienes permiso para acceder a esta página');
  window.location.href = '../../index.html';
}

// Mostrar nombre del usuario
const nombreUsuario = document.getElementById('nombre-usuario') as HTMLElement;
if (usuario) {
  nombreUsuario.textContent = usuario.nombre;
}

// Obtener todos los usuarios
const usuarios = obtenerUsuarios();
const totalUsuarios = usuarios.length;
const totalAdmins = usuarios.filter(u => u.rol === 'admin').length;
const totalClientes = usuarios.filter(u => u.rol === 'client').length;

// Mostrar estadísticas
(document.getElementById('total-usuarios') as HTMLElement).textContent = totalUsuarios.toString();
(document.getElementById('total-admins') as HTMLElement).textContent = totalAdmins.toString();
(document.getElementById('total-clientes') as HTMLElement).textContent = totalClientes.toString();

// Llenar tabla de usuarios
const tablaUsuarios = document.getElementById('tabla-usuarios') as HTMLTableSectionElement;
tablaUsuarios.innerHTML = '';

usuarios.forEach(u => {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${u.email}</td>
    <td>${u.nombre}</td>
    <td><span class="${u.rol === 'admin' ? 'rol-admin' : 'rol-client'}">
      ${u.rol === 'admin' ? '⚙️ Admin' : '👤 Cliente'}
    </span></td>
  `;
  tablaUsuarios.appendChild(fila);
});

// Cerrar sesión
const btnLogout = document.getElementById('btn-logout') as HTMLButtonElement;
btnLogout.addEventListener('click', () => {
  eliminarSesion();
  window.location.href = '../../index.html';
});
