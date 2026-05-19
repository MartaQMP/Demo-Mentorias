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

  public mentoriaData$: Observable<MentoriaData> = this.mentoriaDataSubject.asObservable();

  constructor() {}

  guardarMentoria(data: MentoriaData): void {
    this.mentoriaDataSubject.next(data);
  }

  obtenerMentoria(): MentoriaData {
    return this.mentoriaDataSubject.value;
  }

  generarMentorAleatorio(): number {
    return Math.floor(Math.random() * 10) + 1;
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
