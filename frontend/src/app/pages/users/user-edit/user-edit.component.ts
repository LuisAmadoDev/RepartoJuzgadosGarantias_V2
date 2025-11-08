import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AlertifyService } from '../../../services/alertify.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  userToEdit: User | null = null;
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe({
      next: (user) => (this.userToEdit = user),
      error: () => this.alertify.error('Error cargando el usuario'),
    });
  }

  updateUser(updatedUser: User) {
    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: () => {
        this.alertify.success('Usuario actualizado correctamente');
        this.router.navigate(['/users/show']);
      },
      error: () => this.alertify.error('Error al actualizar el usuario'),
    });
  }

}
