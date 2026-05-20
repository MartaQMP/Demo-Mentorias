import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MentoriaService } from '../../services/mentoria.service';
import { Navbar } from '../navbar/navbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface CalendarDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  isSelected: boolean;
}

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
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  calendarDays: CalendarDay[] = [];
  selectedDate: Date | null = null;
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

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mentoriaService: MentoriaService,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,}$/)]],
      tipoUsuario: ['otro', Validators.required],
      centro: [''],
      tema: ['', [Validators.required, Validators.minLength(3)]],
      hora: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.generarCalendario();
    this.formulario.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (
        this.selectedDate &&
        this.formulario.get('tema')?.valid &&
        this.formulario.get('hora')?.valid
      ) {
        this.asignarMentor();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private generarCalendario(): void {
    this.calendarDays = [];
    const primerDia = new Date(this.currentYear, this.currentMonth, 1);
    const ultimoDia = new Date(this.currentYear, this.currentMonth + 1, 0);
    const diaSemanaPrimer = primerDia.getDay();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

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
        isToday: false,
        isPast: true,
        isSelected: false,
      });
    }

    // Días del mes actual
    for (let day = 1; day <= ultimoDia.getDate(); day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      date.setHours(0, 0, 0, 0);
      const isPast = date < hoy;
      const isToday = date.getTime() === hoy.getTime();

      this.calendarDays.push({
        date,
        day,
        month: this.currentMonth,
        year: this.currentYear,
        isCurrentMonth: true,
        isToday,
        isPast,
        isSelected: this.selectedDate?.getTime() === date.getTime(),
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
        isToday: false,
        isPast: true,
        isSelected: false,
      });
    }
  }

  selectDay(calendarDay: CalendarDay): void {
    if (!calendarDay.isCurrentMonth || calendarDay.isPast) {
      return;
    }

    this.selectedDate = new Date(calendarDay.date);
    this.formulario.patchValue({
      fecha: this.formatDateToInput(this.selectedDate),
    });

    this.calendarDays.forEach((day) => {
      day.isSelected = day.date.getTime() === this.selectedDate!.getTime();
    });

    this.asignarMentor();
  }

  nextMonth(): void {
    // Permitir navegar solo un mes en el futuro
    const proximoMes = new Date(this.currentYear, this.currentMonth + 1, 1);
    const mesActual = new Date();

    if (
      proximoMes.getMonth() <= mesActual.getMonth() + 1 &&
      proximoMes.getFullYear() === mesActual.getFullYear()
    ) {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
      this.generarCalendario();
    }
  }

  previousMonth(): void {
    // Bloquear navegación a meses anteriores
    const mesActual = new Date();
    if (this.currentMonth <= mesActual.getMonth() && this.currentYear <= mesActual.getFullYear()) {
      return;
    }

    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generarCalendario();
  }

  canNavigatePrevious(): boolean {
    const mesActual = new Date();
    return this.currentMonth > mesActual.getMonth() || this.currentYear > mesActual.getFullYear();
  }

  canNavigateNext(): boolean {
    const proximoMes = new Date(this.currentYear, this.currentMonth + 1, 1);
    const mesActual = new Date();
    return (
      proximoMes.getMonth() <= mesActual.getMonth() + 1 &&
      proximoMes.getFullYear() === mesActual.getFullYear()
    );
  }

  private asignarMentor(): void {
    if (
      this.selectedDate &&
      this.formulario.get('tema')?.valid &&
      this.formulario.get('hora')?.valid
    ) {
      const tema = this.formulario.get('tema')?.value;
      const fecha = this.formatDateToInput(this.selectedDate);
      const hora = this.formulario.get('hora')?.value;

      this.mentorAsignado = this.mentoriaService.asignarMentorDeterminista(tema, fecha, hora);
    }
  }

  private formatDateToInput(date: Date): string {
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const día = String(date.getDate()).padStart(2, '0');
    return `${año}-${mes}-${día}`;
  }

  revisarCita(): void {
    if (this.formulario.valid && this.selectedDate) {
      const datos = {
        nombre: this.formulario.get('nombre')?.value,
        apellidos: this.formulario.get('apellidos')?.value,
        telefono: this.formulario.get('telefono')?.value,
        tipoUsuario: this.formulario.get('tipoUsuario')?.value,
        centro: this.formulario.get('centro')?.value,
        tema: this.formulario.get('tema')?.value,
        fecha: this.formatDateToInput(this.selectedDate),
        hora: this.formulario.get('hora')?.value,
        mentorAsignado: this.mentorAsignado,
      };
      this.mentoriaService.guardarMentoria(datos);
      this.router.navigate(['/confirmar-mentoria']);
    }
  }
}
