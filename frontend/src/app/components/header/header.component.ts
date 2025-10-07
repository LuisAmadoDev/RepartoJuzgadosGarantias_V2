import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    titulo: string = 'Reparto Audiencias Complejas';
    subtitulo: string = 'Juzgados Penales con Función de Control de Garantías';
}
