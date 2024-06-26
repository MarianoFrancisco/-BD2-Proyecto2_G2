import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Review } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly apiUrl = `${environments.API_URL}/review`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getReseñasByLibro(id: string): Observable<Review[]> {
    const url = `${this.apiUrl}/book?id=${id}`;
    const headers = this.authService.setHeaders();
    return this.http.get<Review[]>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  // Método para guardar una reseña de un libro
  guardarReseña(libro_id: string, comentario: string, puntuacion: number): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = this.authService.setHeaders();
    const body = { libro_id, comentario, puntuacion };
    console.log(body)
    return this.http.post(url, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
  
}
