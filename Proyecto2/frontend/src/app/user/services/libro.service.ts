import { Libro } from '../interfaces/books.interface';
import { AuthService } from '../../auth/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:5000/api/book'; // Reemplaza con tu URL de la API

  constructor(private http: HttpClient, private authService: AuthService) { }

  getLibros(): Observable<Libro[]> {
    const headers = this.authService.setHeaders();
    return this.http.get<Libro[]>(this.apiUrl, { headers });
  }

  searchLibros(params: any): Observable<Libro[]> {
    const headers = this.authService.setHeaders();
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get<Libro[]>(`${this.apiUrl}/search`, { headers, params: httpParams });
  }

  getLibroById(id: string): Observable<Libro> {
    const headers = this.authService.setHeaders();
    return this.http.get<Libro>(`${this.apiUrl}?id=${id}`, { headers });
  }
}