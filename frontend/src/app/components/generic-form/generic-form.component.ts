import { Component, Input, OnChanges, SimpleChanges, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService, 
    private router: Router,) { }
    
    @Input() courtValue: string = ''; // <-- Recibe el juzgado

  formCaseAssignment!: FormGroup;

  ngOnInit(): void {
    // inicializamos el formulario aquí
    this.formCaseAssignment = this.formBuilder.group({
      court: ['', Validators.required],
      caseNumber: ['', Validators.required],
      numberPeopleCustody: ['', Validators.required],
      crimeCategory: ['', Validators.required],
      remarksField: ['']
    });
  }

  // cada vez que cambie el valor desde el padre, se actualiza el form
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courtValue'] && this.courtValue) {
      if (this.formCaseAssignment) {
        this.formCaseAssignment.patchValue({
          court: this.courtValue
        });
      }
    }
  }

  enviarFormulario(): void {
    console.log('Formulario enviado:', this.formCaseAssignment.value);
    alert('Formulario enviado correctamente (ver consola).');
  }

  limpiarFormulario(): void {
    this.formCaseAssignment.reset();
  }
}
