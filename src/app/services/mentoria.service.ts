import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MentoriaData {
  tema: string;
  fecha: string;
  mentorAsignado: number;
}

@Injectable({
  providedIn: 'root',
})
export class MentoriaService {
  private mentoriaDataSubject = new BehaviorSubject<MentoriaData>({
    tema: '',
    fecha: '',
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
      tema: '',
      fecha: '',
      mentorAsignado: 0,
    });
  }
}
