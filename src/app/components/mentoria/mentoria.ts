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
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mentoriaService: MentoriaService,
  ) {
    this.formulario = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', Validators.required],
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
        tema: this.formulario.get('tema')?.value,
        fecha: this.formulario.get('fecha')?.value,
        mentorAsignado: this.mentorAsignado,
      };
      this.mentoriaService.guardarMentoria(datos);
      this.router.navigate(['/confirmar-mentoria']);
    }
  }
}
