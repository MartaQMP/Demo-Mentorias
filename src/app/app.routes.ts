import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Mentoria } from './components/mentoria/mentoria';
import { Confirmacion } from './components/confirmacion/confirmacion';
import { PanelMentor } from './components/panel-mentor/panel-mentor';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'pedir-mentoria', component: Mentoria, canActivate: [authGuard] },
  { path: 'confirmar-mentoria', component: Confirmacion, canActivate: [authGuard] },
  { path: 'panel-mentor', component: PanelMentor, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
