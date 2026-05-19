import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, Navbar],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formulario: FormGroup;
  errorMensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  entrar(): void {
    if (this.formulario.valid) {
      const { email, password } = this.formulario.value;
      this.authService.login(email, password);
      this.router.navigate(['/']);
    }
  }
}
