import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth'; // ajusta el puerto si es necesario
  private tokenKey = 'token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  // 🔐 Login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem('role', response.role); // 🔹 guarda el rol
          this.loggedIn.next(true);
        }
      })
    );
  }

  // 📝 Registro
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  // 🚪 Logout
  logout(): void {
  localStorage.removeItem('token');  // elimina el token
  this.loggedIn.next(false);         // actualiza el estado
}


  // 📦 Obtener token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // 👁️ Verificar si está autenticado
  isLoggedIn(): Observable<boolean> {
    const hasToken = !!localStorage.getItem(this.tokenKey);
    this.loggedIn.next(hasToken);
    return of(hasToken);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
