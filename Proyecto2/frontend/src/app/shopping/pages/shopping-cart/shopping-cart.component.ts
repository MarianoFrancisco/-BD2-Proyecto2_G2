import { Component, inject } from '@angular/core';
import { ShoppingServieService } from '../../services/shopping-servie.service';
import { LibroPedido } from '../../interfaces/libro-pedido';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  private readonly shoppingService = inject(ShoppingServieService)
  private readonly router = inject(Router)
  librosPedio: LibroPedido[] = this.shoppingService.librosPedio
  direccion: string = ''
  _id: string = '';

  constructor() {

  }
  ngOnInit(): void {
    this.shoppingService.getUserSesion().subscribe({
      next: value => {
        if (value._id) {
          this._id = value._id
        }
      }
    })
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

  getTotalCantidada(): number {
    return this.librosPedio.reduce((sum, libro) => {
      return sum + libro.cantidad_pedido;
    }, 0)
  }

  confirmPedido() {
    if (this.validListBooks() || this.validDireecion()) {
      return
    }

    //alistar el pedido
    this.shoppingService.pedido = {
      usuario_id: this._id,
      libros: [],
      direccion_envio: this.direccion,
      metodo_pago: 'En Efectivo',
      monto_pago: this.getTotalSum()
    }
    this.librosPedio.forEach(libro => {
      const lib = {
        libro_id: libro.libro_id,
        cantidad: libro.cantidad_pedido
      }
      this.shoppingService.pedido?.libros.push(lib)
    });
    Swal.fire({
      title: "Confiramcion Pedido!",
      text: `La direeccion de envio es: ${this.direccion} Total a pagar: ${this.getTotalSum()}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Confirmar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.savePedido()
      }
    });

  }

  private savePedido() {
    if (!this.shoppingService.pedido) {
      return
    }
    this.shoppingService.savePedido(this.shoppingService.pedido).subscribe({
      next: value => {
        Swal.fire({
          title: "Pedido Exitos",
          text: "Su pedido ha sido registrado con exito, sera procesado lo mas rapido posible",
          icon: "success"
        });
        this.dataResumen();
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

  private validListBooks(): boolean {
    if (this.librosPedio.length === 0) {
      Swal.fire({
        title: "Carrito Vacio",
        text: "Aun no hay libros en el carrito para realizar el pedido",
        icon: "info"
      });
      return true
    }
    return false;
  }

  private validDireecion(): boolean {
    if (this.direccion === '') {
      Swal.fire({
        title: "Direccion no valida",
        text: "Ingrese una direccion valida para el envio de su pedido",
        icon: "info"
      });
      return true
    }
    return false
  }
  
  private dataResumen(){
    this.shoppingService.direccion = this.direccion
    this.shoppingService.total = this.getTotalSum()
    this.shoppingService.cantidad = this.getTotalCantidada()
    this.shoppingService.pedido = null;
    this.shoppingService.librosResumen.splice(0, this.shoppingService.librosResumen.length)
    this.shoppingService.librosResumen = [...this.shoppingService.librosPedio]
    this.deleteShopping()
    this.router.navigate(['user/shopping/resum-shopping'])
  }

}
