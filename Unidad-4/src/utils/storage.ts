// src/utils/storage.ts

import { IUser } from '../types/index';

const USERS_KEY = 'users';
const SESSION_KEY = 'userData';

/**
 * Inicializar localStorage con usuarios por defecto si no existen
 */
export const inicializarUsuarios = (): void => {
  const usuariosGuardados = localStorage.getItem(USERS_KEY);

  // Si ya hay usuarios, no hacer nada
  if (usuariosGuardados) return;

  // Si no hay, crear usuarios por defecto
  const usuariosPorDefecto: IUser[] = [
    {
      id: '1',
      email: 'admin@foodstore.com',
      password: 'admin123',
      nombre: 'Administrador',
      rol: 'admin'
    },
    {
      id: '2',
      email: 'cliente@foodstore.com',
      password: 'cliente123',
      nombre: 'Cliente',
      rol: 'client'
    }
  ];

  localStorage.setItem(USERS_KEY, JSON.stringify(usuariosPorDefecto));
};

/**
 * Obtener todos los usuarios guardados
 */
export const obtenerUsuarios = (): IUser[] => {
  const usuarios = localStorage.getItem(USERS_KEY);
  return usuarios ? JSON.parse(usuarios) : [];
};

/**
 * Guardar un nuevo usuario
 */
export const guardarUsuario = (usuario: IUser): void => {
  const usuarios = obtenerUsuarios();
  usuarios.push(usuario);
  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
};

/**
 * Verificar si un email ya existe
 */
export const emailYaExiste = (email: string): boolean => {
  const usuarios = obtenerUsuarios();
  return usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
};

/**
 * Guardar la sesión del usuario (cuando inicia sesión)
 */
export const guardarSesion = (usuario: IUser): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
};

/**
 * Obtener el usuario en sesión actual
 */
export const obtenerSesion = (): IUser | null => {
  const sesion = localStorage.getItem(SESSION_KEY);
  return sesion ? JSON.parse(sesion) : null;
};

/**
 * Eliminar la sesión (cuando cierra sesión)
 */
export const eliminarSesion = (): void => {
  localStorage.removeItem(SESSION_KEY);
};
