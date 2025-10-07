import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
    parrafo1: string = 'Reparto Audiencias Complejas';
    parrafo2: string = 'Ing. Luis Fernando Amado Sánchez';
    year: number = new Date().getFullYear();// Año actual

}
