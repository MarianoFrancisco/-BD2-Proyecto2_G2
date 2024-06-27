import { Injectable, inject } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../interfaces/pedido';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosServiceService {

  private readonly orderURL: string = `${environments.API_URL}/order`;
  private readonly authService = inject(AuthService)

  private http = inject(HttpClient);

  constructor() { }

  public getOrdersAll(estado:string):Observable<Pedido[]>{
    const headers = this.authService.setHeaders();
    return this.http.get<Pedido[]>(`${this.orderURL}/search/?usuario=No&estado=${estado}`, {headers})
  } 

  public updateStatusOreder(estado:any, _id:string):Observable<any>{
    const headers = this.authService.setHeaders();
    return this.http.patch<any>(`${this.orderURL}/${_id}`,estado,{headers})
  }

}
