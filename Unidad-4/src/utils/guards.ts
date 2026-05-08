// src/utils/guards.ts

import { IUser } from '../types/index';
import { obtenerSesion } from './storage';

/**
 * Verificar si el usuario tiene sesión activa
 */
export const verificarSesion = (): IUser | null => {
  return obtenerSesion();
};

/**
 * Proteger una ruta (verificar que hay sesión)
 * Si no hay sesión, retorna false
 */
export const protegerRuta = (): boolean => {
  return verificarSesion() !== null;
};

/**
 * Proteger una ruta por rol
 * Verifica que el usuario sea admin
 */
export const protegerRutaPorRol = (rolRequerido: 'admin' | 'client'): boolean => {
  const usuario = verificarSesion();
  if (!usuario) return false;
  return usuario.rol === rolRequerido;
};
