import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { environments } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Autor } from '../interfaces/author.interface';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private readonly apiUrl = `${environments.API_URL}/author`; // Reemplaza con tu URL de la API

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAutores(): Observable<Autor[]> {
    const headers = this.authService.setHeaders();
    return this.http.get<Autor[]>(this.apiUrl, { headers });
  }
  
}
