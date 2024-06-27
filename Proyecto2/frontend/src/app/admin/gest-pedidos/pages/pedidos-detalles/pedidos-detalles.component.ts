import { Component, inject } from '@angular/core';
import { PedidosServiceService } from '../../services/pedidos-service.service';
import { Pedido } from '../../interfaces/pedido';

@Component({
  selector: 'app-pedidos-detalles',
  templateUrl: './pedidos-detalles.component.html',
  styleUrl: './pedidos-detalles.component.css'
})
export class PedidosDetallesComponent {

  private readonly pedidosService = inject(PedidosServiceService)
  pedido!: Pedido

  ngOnInit(): void {
    this.pedido = this.pedidosService.pedido    
  }


}
