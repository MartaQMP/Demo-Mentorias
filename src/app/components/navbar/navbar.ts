import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-logo">
          <img src="/assets/TechRiders.png" alt="Tech Riders Logo" class="logo-img" />
        </div>
        <ul class="navbar-menu">
          <li><a routerLink="#" routerLinkActive="active" class="nav-link">Candidato</a></li>
          <li><a routerLink="#" routerLinkActive="active" class="nav-link">Solicita</a></li>
          <li><a routerLink="#" routerLinkActive="active" class="nav-link">Conocimiento</a></li>
          <li><a routerLink="#" routerLinkActive="active" class="nav-link">Quienes Somos</a></li>
          <li><a routerLink="#" routerLinkActive="active" class="nav-link">Vídeos</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        background-color: #24385b;
        padding: 0;
        border-bottom: 3px solid #00bcd4;
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .navbar-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }

      .navbar-logo {
        flex-shrink: 0;
      }

      .logo-img {
        height: 50px;
        width: auto;
      }

      .navbar-menu {
        display: flex;
        list-style: none;
        gap: 2rem;
        margin: 0;
        padding: 0;
      }

      .nav-link {
        color: white;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        padding: 0.5rem 1rem;
        border-bottom: 2px solid transparent;
      }

      .nav-link:hover {
        color: #00bcd4;
        border-bottom-color: #00bcd4;
      }

      .nav-link.active {
        color: #00bcd4;
        border-bottom-color: #00bcd4;
      }

      @media (max-width: 768px) {
        .navbar-container {
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        }

        .navbar-menu {
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .nav-link {
          font-size: 0.85rem;
          padding: 0.4rem 0.7rem;
        }
      }
    `,
  ],
})
export class Navbar {}
