import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  @Input() userToEdit: User | null = null;
  @Input() isEdit: boolean = false; 
  @Output() saveUser = new EventEmitter<User>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.userToEdit) {
      this.userForm.patchValue({ ...this.userToEdit, password: '' });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.saveUser.emit(this.userForm.value);
      this.userForm.reset({ role: 'user' });
    }
  }
}
