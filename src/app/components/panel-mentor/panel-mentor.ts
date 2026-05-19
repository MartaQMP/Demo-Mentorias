import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';

export interface SolicitudMentoria {
  id: number;
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  centro: string;
  tema: string;
}

@Component({
  selector: 'app-panel-mentor',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './panel-mentor.html',
  styleUrl: './panel-mentor.css',
})
export class PanelMentor {
  solicitudes: SolicitudMentoria[] = [
    {
      id: 1,
      nombre: 'Juan García López',
      telefono: '612345678',
      fecha: '2026-06-15',
      hora: '10:00',
      centro: 'Instituto Técnico Central',
      tema: 'Angular y TypeScript',
    },
    {
      id: 2,
      nombre: 'María Rodríguez Martín',
      telefono: '687654321',
      fecha: '2026-06-18',
      hora: '14:30',
      centro: 'Universidad Politécnica',
      tema: 'Node.js Backend',
    },
    {
      id: 3,
      nombre: 'Carlos Fernández López',
      telefono: '654987321',
      fecha: '2026-06-20',
      hora: '11:00',
      centro: 'Instituto Superior de Tecnología',
      tema: 'Arquitectura de Software',
    },
    {
      id: 4,
      nombre: 'Ana María González Pérez',
      telefono: '629876543',
      fecha: '2026-06-22',
      hora: '15:00',
      centro: '',
      tema: 'Web Moderna - React',
    },
    {
      id: 5,
      nombre: 'David López Sánchez',
      telefono: '698765432',
      fecha: '2026-06-25',
      hora: '09:30',
      centro: 'Escuela de Código',
      tema: 'DevOps y Docker',
    },
    {
      id: 6,
      nombre: 'Laura Martínez García',
      telefono: '645123456',
      fecha: '2026-06-28',
      hora: '13:00',
      centro: 'Centro de Formación Digital',
      tema: 'Bases de Datos SQL',
    },
  ];

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
