// src/types/index.ts

// Definir el tipo de rol
export type Rol = 'admin' | 'client';

// Interfaz para un usuario
export interface IUser {
  id: string;
  email: string;
  password: string;
  nombre: string;
  rol: Rol;
}

// Interfaz para la respuesta de login/registro
export interface IAuthResponse {
  success: boolean;
  message: string;
  user?: IUser;
}
