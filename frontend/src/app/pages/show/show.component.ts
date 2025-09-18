import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CaseAssignment } from '../../models/case-assignment.model';
import { CrudService } from '../../services/crud.service';

interface Registro {
  numero: number;
  juzgado: string;
}

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit {
  fasTrash = faTrash;
  faEdit = faEdit

  registros: Registro[] = [];
  contador: number = 1;

  caseAssignments: CaseAssignment[] = [];

  // 🎯 Datos del formulario
  court: string = '';
  caseNumber: string = '';
  numberPeopleCustody: '';
  crimeCategory: string = '';
  remarksField: string = '';


  constructor ( private crudService:CrudService) {}


  ngOnInit(): void {
    this.crudService.getCaseAssignments().subscribe((res: CaseAssignment[]) => {
      console.log(res);
      this.caseAssignments = res;
    })
  }


  agregar(juzgado: string): void {
    this.registros.push({
      numero: this.contador++,
      juzgado: juzgado
    });
  }

  eliminar(indice: number): void {
    this.registros.splice(indice, 1);
  }

  // 🎲 Sorteo de un juzgado
  sortear(): void {
    if (this.registros.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.registros.length);
      this.court = this.registros[randomIndex].juzgado;
    } else {
      alert('No hay juzgados en la tabla para sortear.');
    }
  }

  // 🧹 Limpiar tabla
  limpiarTabla(): void {
    this.registros = [];
    this.contador = 1;
  }

  // 🧾 Enviar formulario
  enviarFormulario(): void {
    const data = {
      court: this.court,
      caseNumber: this.caseNumber,
      numberPeopleCustody: this.numberPeopleCustody,
      crimeCategory: this.crimeCategory,
      remarksField: this.remarksField
    };
    console.log('Formulario enviado:', data);
    alert('Formulario enviado correctamente (ver consola).');
  }

  // 🧹 Limpiar formulario
  limpiarFormulario(): void {
    this.court = '';
    this.caseNumber = '';
    this.numberPeopleCustody = null;
    this.crimeCategory = '';
    this.remarksField = '';
  }

}
