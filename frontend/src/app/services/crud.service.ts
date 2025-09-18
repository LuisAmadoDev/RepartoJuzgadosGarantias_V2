import { Injectable } from '@angular/core';
import { CaseAssignment } from '../models/case-assignment.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
   RESP_API: string = 'http://localhost:8000/api/case-assignments';
   httpHeaders = new HttpHeaders().set('Content-type', 'application/json')

  constructor(private httpClient:HttpClient) { }

  getCaseAssignments() {
    return this.httpClient.get(this.RESP_API, { headers: this.httpHeaders })
  }

  getCaseAssignment(id:any) {
    return this.httpClient.get(`${this.RESP_API}/${id}`, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {}
      })
    )
}

  createCaseAssignment(data: CaseAssignment){
    return this.httpClient.post(this.RESP_API, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  updateCaseAssignment(id: any, data: any){
    return this.httpClient.put(`${this.RESP_API}/${id}`, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  deleteCaseAssignment(id: any){
    return this.httpClient.delete(`${this.RESP_API}/${id}`, { headers: this.httpHeaders }).pipe(
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
