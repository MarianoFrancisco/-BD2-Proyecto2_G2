import { Component, inject } from '@angular/core';
import { ShoppingServieService } from '../../services/shopping-servie.service';
import { LibroPedido } from '../../interfaces/libro-pedido';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  private readonly shoppingService = inject(ShoppingServieService)
  librosPedio: LibroPedido[] = this.shoppingService.librosPedio

  constructor() {

  }

  validatePositive(libroPedido: LibroPedido): void {
    if (libroPedido.cantidad_pedido < 1) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No Cantidad menores a cero",
        showConfirmButton: false,
        timer: 1200
      });
      libroPedido.cantidad_pedido = 1;
      return
    }
    if (libroPedido.cantidad_stock < libroPedido.cantidad_pedido) {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Valor excede al stock",
        showConfirmButton: false,
        timer: 1200
      });
      libroPedido.cantidad_pedido = libroPedido.cantidad_stock
    }
  }

  deleteShopping() {
    this.librosPedio.splice(0, this.librosPedio.length)
    if (this.shoppingService.pedido) {
      this.shoppingService.pedido = null
    }
  }

  removeLibroPedido(index: number): void {
    this.librosPedio.splice(index, 1);
  }

  getTotalSum(): string {
    return this.librosPedio.reduce((sum, libro) => {
      return sum + libro.cantidad_pedido * libro.precio;
    }, 0).toFixed(2);
  }

}
