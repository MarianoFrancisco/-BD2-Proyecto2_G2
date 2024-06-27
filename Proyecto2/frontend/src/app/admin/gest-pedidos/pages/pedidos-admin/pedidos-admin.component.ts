import { Component, inject } from '@angular/core';
import { PedidosServiceService } from '../../services/pedidos-service.service';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrl: './pedidos-admin.component.css'
})
export class PedidosAdminComponent {

  private readonly pedidosService = inject(PedidosServiceService)

  ngOnInit(): void {
    this.pedidosService.getOrdersAllInProces().subscribe({
      next: value => {
        console.log(value);
      },
      error: err =>{
        console.error(err);
      }
    })
  }

}
