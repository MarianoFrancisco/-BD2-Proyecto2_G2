import { Autor } from './../interfaces/autor.interface';
import { AuthService } from './../../auth/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutorService {
  private apiUrl = 'http://localhost:5000/api/author'; // Reemplaza con tu URL de la API

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAutores(): Observable<Autor[]> {
    const headers = this.authService.setHeaders();
    return this.http.get<Autor[]>(this.apiUrl, { headers });
  }
}
