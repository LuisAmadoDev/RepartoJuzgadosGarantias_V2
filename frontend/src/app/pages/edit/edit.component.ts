import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CaseAssignment } from '../../models/case-assignment.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  id!: any
  model: CaseAssignment

  constructor(
    private crudService: CrudService, 
    private router: Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') 
    this.crudService.getCaseAssignment(this.id).subscribe((res)=>{
      this.model = {
        _id: res._id,
        court: res.court,
        caseNumber: res.caseNumber,
        numberPeopleCustody: res.numberPeopleCustody,
        crimeCategory: res.crimeCategory,
        remarksField: res.remarksField
      }
    })
  }

  updateForm(): void {
  this.crudService.updateCaseAssignment(this.id, this.model).subscribe(res => {
    console.log('Registro actualizado:', res);
    this.router.navigate(['/']); // redirigir si quieres
  });
}

}
