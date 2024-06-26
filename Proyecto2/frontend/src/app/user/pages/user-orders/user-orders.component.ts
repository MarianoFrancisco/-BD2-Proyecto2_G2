import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order.interface';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styles: ``
})
export class UserOrdersComponent implements OnInit, OnDestroy {

  private orderService = inject(OrderService);
  private ordersSub?: Subscription;

  public myOrders: Order[] = [];

  ngOnInit(): void {
    this.ordersSub = this.orderService.getMyOrders().pipe(
      switchMap(() => this.orderService.myOrders())
    ).subscribe(orders => {
      this.myOrders = orders;
    });
  }

  ngOnDestroy(): void {
    this.ordersSub?.unsubscribe();
  }

}
