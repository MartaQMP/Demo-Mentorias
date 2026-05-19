import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}

  irAMentoria(): void {
    this.router.navigate(['/pedir-mentoria']);
  }
}
