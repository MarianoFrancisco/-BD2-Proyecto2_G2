import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorWithBooks } from '../../models';
import { AuthService } from './../../auth/services/auth.service'; 
import { environments } from './../../../environments/environments'; 

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private apiUrl = environments.API_URL;
  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Nzc4YjE5OTFiMzA4OWYyMzAwYjMwMiIsIm5vbWJyZSI6IkZyYW5jaXNjbyIsImFwZWxsaWRvIjoiQ2FtcG9zZWNvIiwicm9sIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTcxOTM3MTg4MywiZXhwIjoxNzE5Mzg5ODgzfQ.T65chYKHCgwI9fJ6g4pYRuNkuu8S0JXBUcMhpsOJshU';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Método para obtener todos los autores con sus libros
  getAllAuthors(): Observable<AuthorWithBooks[]> {
    const url = `${this.apiUrl}/author`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<AuthorWithBooks[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener un autor por su ID
  getAuthorById(id: string): Observable<AuthorWithBooks> {
    const url = `${this.apiUrl}/author?id=${id}`;
    //const headers = this.authService.setHeaders();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<AuthorWithBooks>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

   // Método para eliminar autor
   deleteAuthorById(id: string): Observable<any> {
    const url = `${this.apiUrl}/author/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(url,{ headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para manejar errores
  private handleError(error: any) {
    console.error('Ocurrió un error', error);
    return throwError(error);
  }
}
