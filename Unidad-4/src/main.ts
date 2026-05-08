import { inicializarUsuarios } from './utils/storage';

inicializarUsuarios();

const btnLogin = document.getElementById('btn-login') as HTMLButtonElement;
const btnRegistro = document.getElementById('btn-registro') as HTMLButtonElement;

btnLogin.addEventListener('click', () => {
  window.location.href = './src/pages/auth/login/login.html';
});

btnRegistro.addEventListener('click', () => {
  window.location.href = './src/pages/auth/registro/registro.html';
});
