import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CrudService } from '../../services/crud.service';
import { CaseAssignment } from '../../models/case-assignment.model';
import { AlertifyService } from '../../services/alertify.service';


@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent implements OnInit {
  caseAssignments: CaseAssignment[];

  // 🎲 Iconos
  fasTrash = faTrash;
  faEdit = faEdit

  // 📄 Paginación
  currentPage = 1; // página inicial


  // 📝 Filtros de búsqueda
  filters: any = {
    assignedAt: '',
    court: '',
    caseNumber: '',
    numberPeopleCustody: '',
    crimeCategory: '',
    remarksField: ''
  };
  
  constructor(
    private crudService: CrudService,
    private alertifyService: AlertifyService) { }

  // 🎲 Obtener datos del backend al iniciar el componente
    ngOnInit(): void {
  this.crudService.getCaseAssignments().subscribe((res: CaseAssignment[]) => {
    // 🔹 Ordenar de más reciente a más antiguo
    this.caseAssignments = res.sort((a, b) => {
      const fechaA = new Date(a.assignedAt!).getTime();
      const fechaB = new Date(b.assignedAt!).getTime();
      return fechaB - fechaA;
    });
  });
}


    // 🗑️ Eliminar registro del backend
  eliminarRegistro(id:any, index:any){
    this.alertifyService.confirm({
      message: '¿Estás seguro de eliminar este registro?',
      callbanck_delete: () => {
        this.crudService.deleteCaseAssignment(id).subscribe( (res) =>{
          this.caseAssignments.splice(index, 1); // eliminar de la lista en pantalla
        })
      }
    });
  }
}
