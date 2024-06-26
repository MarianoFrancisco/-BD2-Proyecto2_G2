import { Injectable } from '@angular/core';
import { Pedido } from '../interfaces/pedido';
import { LibroPedido } from '../interfaces/libro-pedido';

@Injectable({
  providedIn: 'root'
})
export class ShoppingServieService {

  pedido:Pedido | null = null
  librosPedio: LibroPedido [] = [
    {
      titulo: 'Divina comedia',
      autor_id: '15151515',
      disponibilidad: true,
      cantidad_stock: 2,
      precio: 192.1,
      cantidad_pedido: 1
    },
    {
      titulo: 'El Principito',
      autor_id: '15151515',
      disponibilidad: true,
      cantidad_stock: 2,
      precio: 192.1,
      cantidad_pedido: 1
    },
  ]

  constructor() { }
}
