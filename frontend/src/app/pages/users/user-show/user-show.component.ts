import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AlertifyService } from '../../../services/alertify.service';
import { User } from '../../../models/user.model';
import { CrudService } from '../../../services/crud.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrl: './user-show.component.css'
})
export class UserShowComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(
    private userService: UserService,
    private crudService: CrudService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => (this.users = res),
      error: () => this.alertify.error('Error cargando usuarios'),
    });
  }

  createUser(user: User) {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser._id!, user).subscribe(() => {
        this.alertify.success('Usuario actualizado');
        this.selectedUser = null;
        this.getUsers();
      });
    } else {
      this.userService.createUser(user).subscribe(() => {
        this.alertify.success('Usuario creado');
        this.getUsers();
      });
    }
  }

  updateUser(user: User) {
    this.selectedUser = user;
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.alertify.success('Usuario eliminado');
      this.getUsers();
    });
  }

  exportToExcel() {
  this.crudService.getCaseAssignments().subscribe((data) => {

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = {
      Sheets: { 'Audiencias': worksheet },
      SheetNames: ['Audiencias']
    };

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const file = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });

    saveAs(file, 'audiencias.xlsx');
  });
}


}
