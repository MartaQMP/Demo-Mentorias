import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MentoriaService } from '../../services/mentoria.service';
import { Navbar } from '../navbar/navbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mentoria',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Navbar],
  templateUrl: './mentoria.html',
  styleUrl: './mentoria.css',
})
export class Mentoria implements OnInit, OnDestroy {
  formulario: FormGroup;
  mentorAsignado: number = 0;
  fechaMinima: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mentoriaService: MentoriaService,
  ) {
    // Establecer fecha mínima como hoy
    this.fechaMinima = this.obtenerFechaHoy();

    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,}$/)]],
      tipoUsuario: ['otro', Validators.required],
      centro: [''],
      tema: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.formulario.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.formulario.get('tema')?.valid && this.formulario.get('fecha')?.valid) {
        this.mentorAsignado = this.mentoriaService.generarMentorAleatorio();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  revisarCita(): void {
    if (this.formulario.valid) {
      const datos = {
        nombre: this.formulario.get('nombre')?.value,
        apellidos: this.formulario.get('apellidos')?.value,
        telefono: this.formulario.get('telefono')?.value,
        tipoUsuario: this.formulario.get('tipoUsuario')?.value,
        centro: this.formulario.get('centro')?.value,
        tema: this.formulario.get('tema')?.value,
        fecha: this.formulario.get('fecha')?.value,
        hora: this.formulario.get('hora')?.value,
        mentorAsignado: this.mentorAsignado,
      };
      this.mentoriaService.guardarMentoria(datos);
      this.router.navigate(['/confirmar-mentoria']);
    }
  }

  private obtenerFechaHoy(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const día = String(hoy.getDate()).padStart(2, '0');
    return `${año}-${mes}-${día}`;
  }
}
