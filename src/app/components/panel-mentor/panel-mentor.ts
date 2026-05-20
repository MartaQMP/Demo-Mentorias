import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentoriaService, CharlaProgamada } from '../../services/mentoria.service';
import { Navbar } from '../navbar/navbar';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

interface CalendarDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  hasCharlas: boolean;
  charlas: CharlaProgamada[];
}

@Component({
  selector: 'app-panel-mentor',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './panel-mentor.html',
  styleUrl: './panel-mentor.css',
})
export class PanelMentor implements OnInit {
  charlasProgramadas: CharlaProgamada[] = [];
  calendarDays: CalendarDay[] = [];
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  selectedDay: number | null = null;
  charlasSelecionadas: CharlaProgamada[] = [];
  daysOfWeek: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];
  monthNames: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  constructor(private mentoriaService: MentoriaService) {
    registerLocaleData(localeEs);
  }

  ngOnInit(): void {
    this.charlasProgramadas = this.mentoriaService.obtenerCharlasProgramadas();
    this.generarCalendario();
  }

  private generarCalendario(): void {
    this.calendarDays = [];
    const primerDia = new Date(this.currentYear, this.currentMonth, 1);
    const ultimoDia = new Date(this.currentYear, this.currentMonth + 1, 0);
    const diaSemanaPrimer = primerDia.getDay();
    const diasConCharlas = this.mentoriaService.obtenerDiasConCharlas();

    // Días del mes anterior
    const diasMesAnterior = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = diaSemanaPrimer - 1; i >= 0; i--) {
      const day = diasMesAnterior - i;
      const date = new Date(this.currentYear, this.currentMonth - 1, day);
      this.calendarDays.push({
        date,
        day,
        month: this.currentMonth - 1,
        year: this.currentYear,
        isCurrentMonth: false,
        hasCharlas: false,
        charlas: [],
      });
    }

    // Días del mes actual
    for (let day = 1; day <= ultimoDia.getDate(); day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      const hasCharlas = diasConCharlas.includes(day);
      const charlas = this.mentoriaService.obtenerCharlasPorDia(day);

      this.calendarDays.push({
        date,
        day,
        month: this.currentMonth,
        year: this.currentYear,
        isCurrentMonth: true,
        hasCharlas,
        charlas,
      });
    }

    // Días del mes siguiente
    const diasRestantes = 42 - this.calendarDays.length;
    for (let day = 1; day <= diasRestantes; day++) {
      const date = new Date(this.currentYear, this.currentMonth + 1, day);
      this.calendarDays.push({
        date,
        day,
        month: this.currentMonth + 1,
        year: this.currentYear,
        isCurrentMonth: false,
        hasCharlas: false,
        charlas: [],
      });
    }
  }

  selectDay(calendarDay: CalendarDay): void {
    if (!calendarDay.isCurrentMonth || !calendarDay.hasCharlas) {
      return;
    }

    this.selectedDay = this.selectedDay === calendarDay.day ? null : calendarDay.day;

    if (this.selectedDay) {
      this.charlasSelecionadas = calendarDay.charlas;
    } else {
      this.charlasSelecionadas = [];
    }
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  obtenerNombresCharlas(charlas: CharlaProgamada[]): string {
    return charlas.map((c) => c.centro || 'Sin especificar').join(', ');
  }
}
