import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MentoriaService, MentoriaData } from '../../services/mentoria.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.css',
})
export class Confirmacion implements OnInit {
  mentoriaData: MentoriaData = {
    tema: '',
    fecha: '',
    mentorAsignado: 0,
  };
  mostrarExito = false;

  constructor(
    private mentoriaService: MentoriaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.mentoriaData = this.mentoriaService.obtenerMentoria();
  }

  confirmarCita(): void {
    this.mostrarExito = true;
    setTimeout(() => {
      this.mentoriaService.limpiarDatos();
      this.router.navigate(['/home']);
    }, 4000);
  }

  cerrarExito(): void {
    this.mentoriaService.limpiarDatos();
    this.router.navigate(['/home']);
  }

  formatearFecha(fechaStr: string): string {
    if (!fechaStr) return '';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
