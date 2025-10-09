import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
    // Si existe un token, permitimos el acceso
    return true;
  } else {
    // Si no hay token, redirigimos al login
    router.navigate(['/login']);
    return false;
  }
};
