import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service'; 
import { environments } from './../../../environments/environments'; 
import { AuthorWithBooks,Genero } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RegistryBooksService {
  private apiUrl = environments.API_URL;

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Método para obtener todos los autores con sus libros
  getAllAuthors(): Observable<AuthorWithBooks[]> {
    const url = `${this.apiUrl}/author`;
    const headers = this.authService.setHeaders();
    return this.http.get<AuthorWithBooks[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener todos los generos
  getAllGenres(): Observable<Genero[]> {
    const url = `${this.apiUrl}/genre`;
    const headers = this.authService.setHeaders();
    return this.http.get<Genero[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para registrar un libro
  registrarLibro(body: FormData): Observable<any> {
    const url = `${this.apiUrl}/book`;
    const headers = this.authService.setHeaders();
    return this.http.post(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: any) {
    console.error('Ocurrió un error', error);
    return throwError(error);
  }
}
