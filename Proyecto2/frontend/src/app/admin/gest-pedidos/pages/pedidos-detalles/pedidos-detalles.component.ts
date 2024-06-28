import { Component, inject } from '@angular/core';
import { PedidosServiceService } from '../../services/pedidos-service.service';
import { Pedido } from '../../interfaces/pedido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-detalles',
  templateUrl: './pedidos-detalles.component.html',
  styleUrl: './pedidos-detalles.component.css'
})
export class PedidosDetallesComponent {

  private readonly pedidosService = inject(PedidosServiceService)
  private readonly router = inject(Router)
  pedido!: Pedido

  ngOnInit(): void {
    this.pedido = this.pedidosService.pedido    
  }

  goBack(){
    this.router.navigate(['admin/gestion-pedidos'])
  }


}
