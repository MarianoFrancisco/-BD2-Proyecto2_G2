import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book, Order, Review } from '../../models';
import { AuthService } from './../../auth/services/auth.service'; 
import { environments } from './../../../environments/environments'; 

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = environments.API_URL;

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Método para obtener órdenes por ID de usuario
  getOrdersByUserId(userId: string): Observable<Order> {
    const url = `${this.apiUrl}/order?id=${userId}`;
    const headers = this.authService.setHeaders();
    /*
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    */
    return this.http.get<Order>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener un libro por su ID
  getLibroById(id: string): Observable<Book> {
    const url = `${this.apiUrl}/book?id=${id}`;
    const headers = this.authService.setHeaders();
    /*
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    */
    return this.http.get<Book>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener las reseñas de un libro por su ID
  getReseñasByLibro(id: string): Observable<Review[]> {
    const url = `${this.apiUrl}/review/book?id=${id}`;
    const headers = this.authService.setHeaders();
    /*
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    */
    return this.http.get<Review[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para guardar una reseña de un libro
  guardarReseña(libro_id: string, comentario: string, puntuacion: number): Observable<any> {
    const url = `${this.apiUrl}/review`;
    const headers = this.authService.setHeaders();
    /*
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    */
    const body = { libro_id, comentario, puntuacion };
    console.log(body)
    return this.http.post(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para manejar errores
  private handleError(error: any) {
    console.error('Ocurrió un error', error);
    return throwError(error);
  }
}
