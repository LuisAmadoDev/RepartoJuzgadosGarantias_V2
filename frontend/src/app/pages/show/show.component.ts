import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CaseAssignment } from '../../models/case-assignment.model';
import { CrudService } from '../../services/crud.service';

// 🎲 Interfaz para los registros de la tabla
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
  
  sorteoInterval: any; // referencia global al intervalo

  // 🎲 Iconos
  fasTrash = faTrash;
  faEdit = faEdit

  sorteoEnProgreso: boolean = false;   // para mostrar el efecto
  nombreSorteo: string = '';           // texto animado que se verá en pantalla

  
  // 🎲 Tabla de juzgados
  registros: Registro[] = [];
  contador: number = 1;

  // 🎲 Datos obtenidos del backend
  caseAssignments: CaseAssignment[] = [];

  // 🎲 Juzgados disponibles para agregar a la tabla
  juzgadosDisponibles: string[] = [
  'Juzgado 1° Garantias',
  'Juzgado 2° Garantias',
  'Juzgado 3° Garantias',
  'Juzgado 4° Garantias',
  'Juzgado 5° Garantias',
  'Juzgado 6° Garantias'
];
  
  // 🎲 Verificar si un juzgado ya está en la tabla
  estaDeshabilitado(juzgado: string): boolean {
  return this.registros.some(r => r.juzgado === juzgado);
}
  
  // 🎯 Datos del formulario
  court: string = '';
  caseNumber: string = '';
  numberPeopleCustody: '';
  crimeCategory: string = '';
  remarksField: string = '';


  constructor ( private crudService:CrudService) {}

  // 🎲 Obtener datos del backend al iniciar el componente
  ngOnInit(): void {
    this.crudService.getCaseAssignments().subscribe((res: CaseAssignment[]) => {
      console.log(res);
      this.caseAssignments = res;
    })
  }

  //TABLA DE SORTEO
  // 📝 Agregar y eliminar juzgados de la tabla
  agregar(juzgado: string): void {
  this.registros.push({
    numero: this.registros.length + 1, // se asigna en base al tamaño actual
    juzgado: juzgado
    });
  } 
  
  // 🗑️ Eliminar un juzgado de la tabla y reenumerar
  eliminar(indice: number): void {
  this.registros.splice(indice, 1);
  this.reenumerar();
 }

 // 🔢 Reenumerar los números de la tabla
reenumerar(): void {
  this.registros = this.registros.map((reg, i) => ({
    ...reg,
    numero: i + 1
   }));
 }
  
  //BOTONES DE LA TABLA DE SORTEO
  // 🧹 Limpiar tabla
  limpiarTabla(): void {
  this.registros = []; // vaciar la tabla
  this.contador = 1; // reiniciar contador
  this.court = ''; //limpiar el campo del formulario
  this.nombreSorteo = ''; // limpiar texto del sorteo
  this.sorteoEnProgreso = false;// detener efecto si estaba en progreso

  // Limpiar el intervalo si estaba activo
  if (this.sorteoInterval) {
    clearInterval(this.sorteoInterval);
    this.sorteoInterval = null;
  }
}
  
  // 🎲 Sorteo de un juzgado
 sortear(): void {
  if (this.registros.length === 0) {
    alert('No hay juzgados en la tabla para sortear.');
    return;
  }
  
  // INICIAR EL EFECTO DE SORTEO
  this.sorteoEnProgreso = true;
  this.nombreSorteo = '';

  // Guardamos el intervalo en la propiedad
  this.sorteoInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * this.registros.length);
    this.nombreSorteo = this.registros[randomIndex].juzgado;
  }, 200);

  // Después de 5 segundos detenemos el "sorteo"
  setTimeout(() => {
    clearInterval(this.sorteoInterval);
    this.sorteoInterval = null; // limpiamos la referencia

    const randomIndex = Math.floor(Math.random() * this.registros.length);
    this.court = this.registros[randomIndex].juzgado;
    this.nombreSorteo = this.court;  // mostrar el definitivo
    this.sorteoEnProgreso = false;
  }, 5000);
}

  //BOTONES DEL FORMULARIO
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
