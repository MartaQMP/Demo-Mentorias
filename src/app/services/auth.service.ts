import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthUser {
  id?: string;
  nombre: string;
  email: string;
  autenticado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<AuthUser>({
    nombre: '',
    email: '',
    autenticado: false,
  });

  public auth$: Observable<AuthUser> = this.authSubject.asObservable();

  constructor() {
    this.cargarDelLocalStorage();
  }

  login(email: string, password: string): boolean {
    // Simulación de login
    const usuario: AuthUser = {
      id: Math.random().toString(),
      nombre: email.split('@')[0],
      email: email,
      autenticado: true,
    };
    this.authSubject.next(usuario);
    localStorage.setItem('auth_user', JSON.stringify(usuario));
    return true;
  }

  registro(nombre: string, apellidos: string, email: string, password: string): boolean {
    // Simulación de registro
    const usuario: AuthUser = {
      id: Math.random().toString(),
      nombre: nombre + ' ' + apellidos,
      email: email,
      autenticado: true,
    };
    this.authSubject.next(usuario);
    localStorage.setItem('auth_user', JSON.stringify(usuario));
    return true;
  }

  logout(): void {
    this.authSubject.next({
      nombre: '',
      email: '',
      autenticado: false,
    });
    localStorage.removeItem('auth_user');
  }

  obtenerUsuario(): AuthUser {
    return this.authSubject.value;
  }

  estaAutenticado(): boolean {
    return this.authSubject.value.autenticado;
  }

  private cargarDelLocalStorage(): void {
    const usuario = localStorage.getItem('auth_user');
    if (usuario) {
      try {
        this.authSubject.next(JSON.parse(usuario));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      }
    }
  }
}
