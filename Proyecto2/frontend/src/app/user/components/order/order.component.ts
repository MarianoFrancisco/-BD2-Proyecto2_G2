import { Component, Input, inject } from '@angular/core';
import { Order, Status } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'user-order',
  templateUrl: './order.component.html',
  styles: ``
})
export class OrderComponent {

  @Input({ required: true }) public orderNumber!: number;
  @Input({ required: true }) public order!: Order;

  private orderService = inject(OrderService);
  private notifService = inject(NotificationService);

  returnColorText() {
    return {
      'text-primary': this.order.estado === Status.enviado,
      'text-success': this.order.estado === Status.entregado,
      'text-warning': this.order.estado === Status.en_proceso
    };
  }

  public setDelivered(): void {
    this.orderService.setDelivered(this.order._id).subscribe({
      next: () => this.notifService.show('Estado actualizado.', 'success'),
      error: () => this.notifService.show('Algo salio mal.')
    })
  }

}
