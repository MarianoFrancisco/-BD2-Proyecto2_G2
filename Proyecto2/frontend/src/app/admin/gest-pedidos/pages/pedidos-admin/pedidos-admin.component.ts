import { Component, inject } from '@angular/core';
import { PedidosServiceService } from '../../services/pedidos-service.service';
import { Pedido } from '../../interfaces/pedido';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrl: './pedidos-admin.component.css'
})
export class PedidosAdminComponent {

  private readonly pedidosService = inject(PedidosServiceService)
  private readonly router = inject(Router)

  estadoPedido: string = ''

  pedidos: Pedido[] = []

  ngOnInit(): void {
    this.getOrders('En proceso')
  }

  sentBook(pedido: Pedido, index: number) {
    Swal.fire({
      title: "Enviar Pedido!",
      text: `Confirmar el envio de pedido`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Confirmar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidosService.updateStatusOreder({ estado: 'Enviado' }, pedido._id).subscribe({
          next: value => {
            Swal.fire({
              title: "Envio Exitos",
              text: "El pedido ya esta en proceso de envio y se entregara lo antes posible!",
              icon: "success"
            });
            this.pedidos.splice(index, 1);
          },
          error: err => {
            Swal.fire({
              title: "Error!!",
              text: "Error en el servidor, verifique con soporte",
              icon: "error"
            });
          }
        })
      }
    });
  }

  getOrders(estado: string) {
    this.pedidosService.getOrdersAll(estado).subscribe({
      next: value => {
        this.pedidos = value
        this.estadoPedido = estado
      },
      error: err => {
        console.error(err);
      }
    })
  }

  goDetail(pedido:Pedido){
    this.pedidosService.pedido = pedido
    this.router.navigate(['admin/gestion-pedidos/detalles'])
  }
}
