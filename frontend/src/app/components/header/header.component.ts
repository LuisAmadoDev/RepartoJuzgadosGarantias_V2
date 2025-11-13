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
  isAdminView: boolean = false;

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
    // Mostrar botón de logout solo en rutas específicas
    this.showLogoutButton = url.startsWith('/show') || url.startsWith('/users/show-user');

    // Si estás en vista admin (ajusta el path según tu ruta real)
    this.isAdminView = url.startsWith('/users/show-user');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
