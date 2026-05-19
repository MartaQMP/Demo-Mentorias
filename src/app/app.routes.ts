import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Mentoria } from './components/mentoria/mentoria';
import { Confirmacion } from './components/confirmacion/confirmacion';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Home },
  { path: 'pedir-mentoria', component: Mentoria },
  { path: 'confirmar-mentoria', component: Confirmacion },
  { path: '**', redirectTo: '' },
];
