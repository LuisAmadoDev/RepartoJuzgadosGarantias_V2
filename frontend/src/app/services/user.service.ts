import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  RESP_API: string = 'http://localhost:8000/api/admin/users';
  httpHeaders = new HttpHeaders().set('Content-type', 'application/json')

  constructor(private httpClient:HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.RESP_API, { headers: this.httpHeaders })
  }

  getUser(id:any): Observable<any>{
    return this.httpClient.get(`${this.RESP_API}/${id}`, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {}
      })
    )}

  createUser(data: User): Observable<any>{
    return this.httpClient.post(this.RESP_API, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: any, data: any): Observable<any>{
    return this.httpClient.put(`${this.RESP_API}/${id}`, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: any): Observable<any>{
    return this.httpClient.delete(`${this.RESP_API}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  updateStatus(id: string, active: boolean): Observable<any> {
  return this.httpClient.patch(`${this.RESP_API}/${id}/status`, { active }, { headers: this.httpHeaders }).pipe(
    catchError(this.handleError)
  );
}



  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
