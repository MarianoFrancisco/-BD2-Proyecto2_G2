import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Order } from '../interfaces/order.interface';
import { BehaviorSubject, Observable, catchError, map, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly orderUrl: string = `${environments.API_URL}/order`;
  
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  private _myOrders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor() { }

  public getMyOrders(): Observable<boolean> {
    const url: string = `${this.orderUrl}/search/`;
    const headers: HttpHeaders = this.authService.setHeaders();
    const params: HttpParams = new HttpParams().set('usuario', 'Si');
    return this.httpClient.get<Order[]>(url, { headers, params }).pipe(
      map(orders => {
        this._myOrders.next(orders);
        return true;
      }),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public setDelivered(id: string): Observable<boolean> {
    const url: string = `${this.orderUrl}/${id}`;
    const headers: HttpHeaders = this.authService.setHeaders();
    return this.httpClient.patch<{ message: string, pedido: Order }>(url, { estado: "Entregado" },{ headers }).pipe(
      switchMap(() => this.getMyOrders()),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public myOrders(): Observable<Order[]> {
    return this._myOrders.asObservable();
  }

}
