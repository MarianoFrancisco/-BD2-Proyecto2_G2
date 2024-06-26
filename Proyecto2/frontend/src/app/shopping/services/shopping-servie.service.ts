import { Injectable, inject } from '@angular/core';
import { Pedido } from '../interfaces/pedido';
import { LibroPedido } from '../interfaces/libro-pedido';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../auth/interfaces/user.interface';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingServieService {

  private readonly userURL: string = `${environments.API_URL}/user`;
  private readonly orderURL: string = `${environments.API_URL}/order`;

  private http = inject(HttpClient);
  private readonly authService = inject(AuthService)



  pedido: Pedido | null = null
  librosPedio: LibroPedido[] = []
  librosResumen: LibroPedido[] = []
  direccion: string = ''
  cantidad: number = 0
  total: string = ''

  constructor() { }

  public getUserSesion(): Observable<User> {
    const headers = this.authService.setHeaders();
    return this.http.get<User>(this.userURL, { headers })
  }

  public savePedido(pedido:Pedido): Observable<any> {
    const headers = this.authService.setHeaders();
    return this.http.post<any>(this.orderURL, pedido,{headers})
  }

}
