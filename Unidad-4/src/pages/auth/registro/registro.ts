import { registro } from '../../../utils/auth';
import { inicializarUsuarios } from '../../../utils/storage';

inicializarUsuarios();

const formulario = document.getElementById('formulario-registro') as HTMLFormElement;
const mensajeDiv = document.getElementById('mensaje') as HTMLDivElement;
const nombreInput = document.getElementById('nombre') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const enlaceLogin = document.getElementById('enlace-login') as HTMLElement;
const enlaceHome = document.getElementById('enlace-home') as HTMLElement;

formulario.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const resultado = registro({ email, password, nombre });

  if (resultado.success) {
    mensajeDiv.textContent = resultado.message;
    mensajeDiv.className = 'mensaje exito';
    formulario.reset();

    setTimeout(() => {
      window.location.href = '../../../pages/client/client.html';
    }, 2000);
  } else {
    mensajeDiv.textContent = resultado.message;
    mensajeDiv.className = 'mensaje error';
  }
});

enlaceLogin.addEventListener('click', () => {
  window.location.href = '../login/login.html';
});

enlaceHome.addEventListener('click', () => {
  window.location.href = '../../../index.html';
});
