import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Order } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly apiUrl = `${environments.API_URL}/order`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOrdersByUserId(userId: string): Observable<Order> {
    const url = `${this.apiUrl}?id=${userId}`;
    const headers = this.authService.setHeaders();
    return this.http.get<Order>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

}
