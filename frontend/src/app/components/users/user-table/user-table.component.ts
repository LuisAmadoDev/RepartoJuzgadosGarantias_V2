import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})
export class UserTableComponent {
  //iconos
  faUser = faUser;
  faTrash = faTrash;
  faEdit = faEdit;
  faBan = faBan;
  faCheck = faCheck;

  constructor(private userService: UserService) {}

  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>(); 

   toggleUserStatus(user: any) {
    const newStatus = !user.active;

    this.userService.updateStatus(user._id, newStatus).subscribe({
      next: () => {
        user.active = newStatus; // actualizar visualmente
      },
      error: (err) => console.error(err),
    });
  }

  onEdit(user: User) {
    this.editUser.emit(user);
  }

  onDelete(id: string) {
    this.deleteUser.emit(id);
  }

  refreshList() {
    this.refresh.emit(); // avisamos al padre que debe recargar la lista
  }
}
