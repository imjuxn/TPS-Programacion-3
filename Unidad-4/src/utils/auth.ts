// src/utils/auth.ts

import { IUser, IAuthResponse } from '../types/index';
import {
  obtenerUsuarios,
  guardarUsuario,
  emailYaExiste,
  guardarSesion
} from './storage';

/**
 * Función para registrar un nuevo usuario
 */
export const registro = (datos: {
  email: string;
  password: string;
  nombre: string;
}): IAuthResponse => {
  const { email, password, nombre } = datos;

  // Validación: email vacío
  if (!email || !email.trim()) {
    return {
      success: false,
      message: '❌ El email es requerido'
    };
  }

  // Validación: contraseña menor a 6 caracteres
  if (!password || password.length < 6) {
    return {
      success: false,
      message: '❌ La contraseña debe tener al menos 6 caracteres'
    };
  }

  // Validación: nombre vacío
  if (!nombre || !nombre.trim()) {
    return {
      success: false,
      message: '❌ El nombre es requerido'
    };
  }

  // Validación: email ya existe
  if (emailYaExiste(email)) {
    return {
      success: false,
      message: '❌ Este email ya está registrado'
    };
  }

  // Crear el nuevo usuario
  const nuevoUsuario: IUser = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    password, // En producción NUNCA guardar contraseña en texto plano
    nombre,
    rol: 'client' // Todos los nuevos usuarios son clientes
  };

  // Guardar el usuario
  guardarUsuario(nuevoUsuario);

  // Iniciar sesión automáticamente
  guardarSesion(nuevoUsuario);

  return {
    success: true,
    message: '✅ Registro exitoso. ¡Bienvenido!',
    user: nuevoUsuario
  };
};

/**
 * Función para iniciar sesión
 */
export const login = (datos: {
  email: string;
  password: string;
}): IAuthResponse => {
  const { email, password } = datos;

  // Validación: email vacío
  if (!email || !email.trim()) {
    return {
      success: false,
      message: '❌ El email es requerido'
    };
  }

  // Validación: contraseña vacía
  if (!password) {
    return {
      success: false,
      message: '❌ La contraseña es requerida'
    };
  }

  // Buscar el usuario con ese email
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );

  // Si no existe
  if (!usuario) {
    return {
      success: false,
      message: '❌ Email o contraseña incorrectos'
    };
  }

  // Si la contraseña no coincide
  if (usuario.password !== password) {
    return {
      success: false,
      message: '❌ Email o contraseña incorrectos'
    };
  }

  // Todo correcto, iniciar sesión
  guardarSesion(usuario);

  return {
    success: true,
    message: `✅ ¡Bienvenido, ${usuario.nombre}!`,
    user: usuario
  };
};
