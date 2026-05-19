import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, Navbar],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  formulario: FormGroup;
  mensajeExito: string = '';
  errorMensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.formulario = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        apellidos: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.validarContraseña]],
        confirmar: ['', Validators.required],
      },
      { validators: this.validarCoincidencia },
    );
  }

  validarContraseña(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const tieneNumero = /[0-9]/.test(password);
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinimum = password.length >= 6;

    if (!tieneNumero || !tieneMayuscula || !tieneMinimum) {
      return { passwordInvalid: true };
    }
    return null;
  }

  validarCoincidencia(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmar = group.get('confirmar')?.value;
    return password === confirmar ? null : { passwordMismatch: true };
  }

  registrarse(): void {
    if (this.formulario.valid) {
      const { nombre, apellidos, email, password } = this.formulario.value;
      this.authService.registro(nombre, apellidos, email, password);
      this.mensajeExito = 'Registro completado. Redirigiendo...';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }
  }

  getPasswordError(): string {
    const control = this.formulario.get('password');
    if (!control || !control.value) return '';

    const password = control.value;
    const errors = [];

    if (password.length < 6) errors.push('mínimo 6 caracteres');
    if (!/[0-9]/.test(password)) errors.push('incluir un número');
    if (!/[A-Z]/.test(password)) errors.push('incluir una mayúscula');

    return errors.length > 0 ? 'Contraseña debe tener: ' + errors.join(', ') : '';
  }
}
