import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faRightFromBracket = faRightFromBracket;

  titulo: string = 'Reparto Audiencias Complejas';
  subtitulo: string = 'Juzgados Penales con Función de Control de Garantías';

  showLogoutButton: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // 1) comprobación inmediata (cuando el componente se monta)
    this.updateLogoutVisibility(this.router.url);

    // 2) escucha cambios de ruta posteriores
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // usa urlAfterRedirects para evitar problemas con redirects
        this.updateLogoutVisibility(event.urlAfterRedirects ?? event.url);
      });
  }

  private updateLogoutVisibility(url: string) {
    // Ajusta la condición aquí a la ruta exacta que quieras (/show)
    // Uso startsWith para que funcione con /show y /show/anything
    this.showLogoutButton = url.startsWith('/show') || url.startsWith('/users/show-user');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
