import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  faUser = faUser;
  faLock = faLock;

  email = '';
  password = '';
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  onLogin() {
    const email = this.email.toLowerCase().trim(); // convierte a minúsculas y elimina espacios
    const password = this.password.trim(); // elimina espacios innecesarios

    // ✅ Aquí ya está bien separado del código anterior
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.alertify.success('Inicio de sesión exitoso');

        // ✅ Obtener rol del usuario
        const role = localStorage.getItem('role');

        // 🔀 Redirigir según el rol
        if (role === 'admin') {
          console.log('➡️ Redirigiendo a /users/show-user...');
          this.router.navigate(['/users/show-user']); // página de administración de usuarios
        } else {
          console.log('➡️ Redirigiendo a /show...');
          this.router.navigate(['/show']); // página principal
        }
      },
      error: () => {
        this.alertify.error('Credenciales incorrectas');
      }
    });
  }
}
