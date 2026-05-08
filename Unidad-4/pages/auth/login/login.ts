import { login } from '../../../utils/auth';
import { inicializarUsuarios } from '../../../utils/storage';

inicializarUsuarios();

const formulario = document.getElementById('formulario-login') as HTMLFormElement;
const mensajeDiv = document.getElementById('mensaje') as HTMLDivElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const enlaceRegistro = document.getElementById('enlace-registro') as HTMLElement;
const enlaceHome = document.getElementById('enlace-home') as HTMLElement;

formulario.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const resultado = login({ email, password });

  if (resultado.success) {
    mensajeDiv.textContent = resultado.message;
    mensajeDiv.className = 'mensaje exito';
    formulario.reset();

    setTimeout(() => {
      if (resultado.user?.rol === 'admin') {
        window.location.href = '../../../pages/admin/admin.html';
      } else {
        window.location.href = '../../../pages/client/client.html';
      }
    }, 1500);
  } else {
    mensajeDiv.textContent = resultado.message;
    mensajeDiv.className = 'mensaje error';
  }
});

enlaceRegistro.addEventListener('click', () => {
  window.location.href = '../registro/registro.html';
});

enlaceHome.addEventListener('click', () => {
  window.location.href = '../../../index.html';
});
