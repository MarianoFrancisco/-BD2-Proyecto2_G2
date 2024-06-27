import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service'; 
import { environments } from './../../../environments/environments'; 
import { AuthorWithBooks,Genero,Book } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RegistryBooksService {
  private apiUrl = environments.API_URL;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllAuthors(): Observable<AuthorWithBooks[]> {
    const url = `${this.apiUrl}/author`;
    const headers = this.authService.setHeaders();
    return this.http.get<AuthorWithBooks[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAllGenres(): Observable<Genero[]> {
    const url = `${this.apiUrl}/genre`;
    const headers = this.authService.setHeaders();
    return this.http.get<Genero[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  registrarLibro(body: FormData): Observable<any> {
    const url = `${this.apiUrl}/book`;
    const headers = this.authService.setHeaders();
    return this.http.post(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updatebook(body: any, id: string): Observable<any> {
    const url = `${this.apiUrl}/book/${id}`;
    const headers = this.authService.setHeaders();
    return this.http.put<any>(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

    getBookById(id: string): Observable<Book> {
      const url = `${this.apiUrl}/book?id=${id}`;
      const headers = this.authService.setHeaders();
      return this.http.get<Book>(url, { headers }).pipe(
        catchError(this.handleError)
      );
    }

    deleteBookById(id: string): Observable<any> {
      const url = `${this.apiUrl}/book/${id}`;
      const headers = this.authService.setHeaders();
      return this.http.delete(url,{ headers }).pipe(
        catchError(this.handleError)
      );
    }

  private handleError(error: any) {
    console.error('Ocurrió un error', error);
    return throwError(error);
  }
}
