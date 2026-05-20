import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MentoriaData {
  nombre: string;
  apellidos: string;
  telefono: string;
  tipoUsuario: 'profesorado' | 'otro';
  centro?: string;
  tema: string;
  fecha: string;
  hora: string;
  mentorAsignado: number;
}

export interface CharlaProgamada {
  id: number;
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  centro: string;
  tema: string;
  mentorAsignado: number;
}

interface CasoAsignacion {
  tema: string;
  dia: number;
  hora: string;
  mentorAsignado: number;
}

@Injectable({
  providedIn: 'root',
})
export class MentoriaService {
  private mentoriaDataSubject = new BehaviorSubject<MentoriaData>({
    nombre: '',
    apellidos: '',
    telefono: '',
    tipoUsuario: 'otro',
    centro: '',
    tema: '',
    fecha: '',
    hora: '',
    mentorAsignado: 0,
  });

  private charlasProgramadas: CharlaProgamada[] = [
    {
      id: 1,
      nombre: 'Juan García López',
      telefono: '612345678',
      fecha: '2026-05-22',
      hora: '10:00',
      centro: 'Instituto Técnico Central',
      tema: 'Angular Avanzado',
      mentorAsignado: 4,
    },
    {
      id: 2,
      nombre: 'María Rodríguez Martín',
      telefono: '687654321',
      fecha: '2026-05-25',
      hora: '14:30',
      centro: 'Universidad Politécnica',
      tema: 'Node.js Backend',
      mentorAsignado: 7,
    },
    {
      id: 3,
      nombre: 'Carlos Fernández López',
      telefono: '654987321',
      fecha: '2026-05-23',
      hora: '11:00',
      centro: 'Instituto Superior de Tecnología',
      tema: 'Arquitectura de Software',
      mentorAsignado: 12,
    },
    {
      id: 4,
      nombre: 'Ana María González Pérez',
      telefono: '629876543',
      fecha: '2026-05-27',
      hora: '15:00',
      centro: 'Centro de Formación Digital',
      tema: 'React Frontend',
      mentorAsignado: 9,
    },
    {
      id: 5,
      nombre: 'David López Sánchez',
      telefono: '698765432',
      fecha: '2026-05-29',
      hora: '09:30',
      centro: 'Escuela de Código',
      tema: 'DevOps Docker',
      mentorAsignado: 15,
    },
    {
      id: 6,
      nombre: 'Laura Martínez García',
      telefono: '645123456',
      fecha: '2026-05-22',
      hora: '13:00',
      centro: 'Academia Técnica Superior',
      tema: 'Bases de Datos SQL',
      mentorAsignado: 3,
    },
    {
      id: 7,
      nombre: 'Roberto Sánchez Pérez',
      telefono: '667890123',
      fecha: '2026-05-24',
      hora: '16:00',
      centro: 'Instituto de Programación',
      tema: 'TypeScript Intermedio',
      mentorAsignado: 8,
    },
    {
      id: 8,
      nombre: 'Sofía Martínez López',
      telefono: '678901234',
      fecha: '2026-05-26',
      hora: '10:30',
      centro: 'Bootcamp Desarrollo Web',
      tema: 'APIs REST',
      mentorAsignado: 5,
    },
  ];

  // Matriz de 15+ casos de asignación DETERMINISTA
  private casosAsignacion: CasoAsignacion[] = [
    { tema: 'Angular', dia: 22, hora: '10:00', mentorAsignado: 4 },
    { tema: 'Angular', dia: 25, hora: '14:30', mentorAsignado: 6 },
    { tema: 'Node.js', dia: 25, hora: '14:30', mentorAsignado: 7 },
    { tema: 'Arquitectura', dia: 23, hora: '11:00', mentorAsignado: 12 },
    { tema: 'React', dia: 27, hora: '15:00', mentorAsignado: 9 },
    { tema: 'DevOps', dia: 29, hora: '09:30', mentorAsignado: 15 },
    { tema: 'SQL', dia: 22, hora: '13:00', mentorAsignado: 3 },
    { tema: 'TypeScript', dia: 24, hora: '16:00', mentorAsignado: 8 },
    { tema: 'APIs', dia: 26, hora: '10:30', mentorAsignado: 5 },
    { tema: 'JavaScript', dia: 20, hora: '09:00', mentorAsignado: 2 },
    { tema: 'Python', dia: 21, hora: '14:00', mentorAsignado: 11 },
    { tema: 'C++', dia: 28, hora: '11:30', mentorAsignado: 14 },
    { tema: 'Java', dia: 30, hora: '13:00', mentorAsignado: 17 },
    { tema: 'Go', dia: 19, hora: '15:00', mentorAsignado: 20 },
    { tema: 'Rust', dia: 18, hora: '10:00', mentorAsignado: 16 },
    { tema: 'MongoDB', dia: 23, hora: '14:00', mentorAsignado: 10 },
  ];

  public mentoriaData$: Observable<MentoriaData> = this.mentoriaDataSubject.asObservable();

  constructor() {}

  guardarMentoria(data: MentoriaData): void {
    this.mentoriaDataSubject.next(data);
  }

  obtenerMentoria(): MentoriaData {
    return this.mentoriaDataSubject.value;
  }

  asignarMentorDeterminista(tema: string, fecha: string, hora: string): number {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();

    // Buscar coincidencia exacta en los casos predefinidos
    const caso = this.casosAsignacion.find(
      (c) => c.tema.toLowerCase().includes(tema.toLowerCase()) && c.dia === dia && c.hora === hora,
    );

    if (caso) {
      return caso.mentorAsignado;
    }

    // Si no hay coincidencia exacta, búsqueda parcial por tema y día
    const casoParcial = this.casosAsignacion.find(
      (c) => c.tema.toLowerCase().includes(tema.toLowerCase()) && c.dia === dia,
    );

    if (casoParcial) {
      return casoParcial.mentorAsignado;
    }

    // Si no hay coincidencia, asignar por defecto dentro del rango 1-20
    const temaCodigo = tema.toLowerCase().charCodeAt(0) + tema.toLowerCase().charCodeAt(1);
    const horaCodigo = hora.split(':').reduce((a, b) => a + parseInt(b, 10), 0);
    const codigoTotal = (temaCodigo + dia + horaCodigo) % 20;

    return codigoTotal === 0 ? 20 : codigoTotal;
  }

  obtenerCharlasProgramadas(): CharlaProgamada[] {
    return this.charlasProgramadas;
  }

  obtenerDiasConCharlas(): number[] {
    return Array.from(
      new Set(
        this.charlasProgramadas.map((charla) => {
          const fecha = new Date(charla.fecha);
          return fecha.getDate();
        }),
      ),
    ).sort((a, b) => a - b);
  }

  obtenerCharlasPorDia(dia: number): CharlaProgamada[] {
    return this.charlasProgramadas.filter((charla) => {
      const fecha = new Date(charla.fecha);
      return fecha.getDate() === dia;
    });
  }

  limpiarDatos(): void {
    this.mentoriaDataSubject.next({
      nombre: '',
      apellidos: '',
      telefono: '',
      tipoUsuario: 'otro',
      centro: '',
      tema: '',
      fecha: '',
      hora: '',
      mentorAsignado: 0,
    });
  }
}
