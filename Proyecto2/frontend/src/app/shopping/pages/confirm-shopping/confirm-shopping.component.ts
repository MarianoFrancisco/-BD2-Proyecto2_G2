import { Component, inject } from '@angular/core';
import { ShoppingServieService } from '../../services/shopping-servie.service';
import { LibroPedido } from '../../interfaces/libro-pedido';

@Component({
  selector: 'app-confirm-shopping',
  templateUrl: './confirm-shopping.component.html',
  styleUrl: './confirm-shopping.component.css'
})
export class ConfirmShoppingComponent {

  private readonly shoppingService = inject(ShoppingServieService)
  librosPedio: LibroPedido[] = this.shoppingService.librosResumen
  direccion:string = this.shoppingService.direccion
  total:string = this.shoppingService.total
  cantidad: number = this.shoppingService.cantidad

  


}
