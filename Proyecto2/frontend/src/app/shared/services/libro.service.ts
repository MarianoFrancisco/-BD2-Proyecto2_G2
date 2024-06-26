import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book, Order, Review } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:5000/api'; // URL de tu API
  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2E1NmVlNzQwYjhlYTA1MzljMWJlYiIsIm5vbWJyZSI6IlBhYmxvIiwiYXBlbGxpZG8iOiJNaW5lcmEiLCJyb2wiOiJDbGllbnRlIiwiaWF0IjoxNzE5MzUwMjcwLCJleHAiOjE3MTkzNjgyNzB9.Tysdz9UrVs8eTQDzjSN_O190-wWpoB4de4WCXN0kHHc';

  constructor(private http: HttpClient) { }

  // Método para obtener órdenes por ID de usuario
  getOrdersByUserId(userId: string): Observable<Order> {
    const url = `${this.apiUrl}/order?id=${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Order>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener un libro por su ID
  getLibroById(id: string): Observable<Book> {
    const url = `${this.apiUrl}/book?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Book>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener las reseñas de un libro por su ID
  getReseñasByLibro(id: string): Observable<Review[]> {
    const url = `${this.apiUrl}/review/book?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Review[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para guardar una reseña de un libro
  guardarReseña(libro_id: string, comentario: string, puntuacion: number): Observable<any> {
    const url = `${this.apiUrl}/review`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
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
