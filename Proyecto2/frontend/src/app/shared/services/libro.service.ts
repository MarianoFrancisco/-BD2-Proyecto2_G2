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
  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzczMTIyNDBkNzEwMWEyMzRmYzU5OCIsIm5vbWJyZSI6Ik1hcmlhbm8iLCJhcGVsbGlkbyI6IkNhbXBvc2VjbyIsInJvbCI6IkNsaWVudGUiLCJpYXQiOjE3MTkzNDkwMDEsImV4cCI6MTcxOTM2NzAwMX0.gd9jbTE11sZgAHJsvk7kf8tF3lpL2p6UYhsFL7bZHCg';

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

  // Método para guardar una reseña 
  guardarReseña(libroId: string, calificacion: number, reseña: string): Observable<any> {
    const url = `${this.apiUrl}/${libroId}/resenas`;
    const body = { calificacion, reseña };
    return this.http.post(url, body).pipe(
      catchError(this.handleError)
    );
  }

  // Método para manejar errores
  private handleError(error: any) {
    console.error('Ocurrió un error', error);
    return throwError(error);
  }
}
