import { Libro } from './../interfaces/books.interface';
import { LibroService } from '../services/libro.service';
import { RegistryBooksService } from '../../admin/service/registry-books.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models';
import Swal from 'sweetalert2';
import { LibroPedido } from '../../shopping/interfaces/libro-pedido';
import { ShoppingServieService } from '../../shopping/services/shopping-servie.service';


@Component({
  selector: 'app-detalle-book',
  templateUrl: './detalle-book.component.html',
  styleUrl: './detalle-book.component.css'
})

export class DetalleBookComponent implements OnInit {
  libro: Libro | undefined | any;
  resenas: Review[] = [];
  defaultImageUrl: string = '../../../assets/libro.png';
  quantity: number = 1;
  isValidQuantity: boolean = true;

  private readonly shoppingService = inject(ShoppingServieService)

  constructor(private route: ActivatedRoute, private libroService: LibroService, private registryBooksService: RegistryBooksService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.libroService.getLibroById(id).subscribe(libro => {
          this.libro = libro;
        });

        this.registryBooksService.getReseñasByLibro(id).subscribe(reseñas => {
          this.resenas = reseñas;
        });
      }
    });
  }

  getStars(puntuacion: number): number[] {
    const stars = [];
    for (let i = 0; i < Math.floor(puntuacion); i++) {
      stars.push(1);
    }
    return stars;
  }

  rate(star: number): void {
    // Aquí puedes manejar la lógica para guardar la calificación
    console.log(`Calificado con ${star} estrellas`);
    alert(`Calificado con ${star} estrellas`);
  }

  imgError(event: any): void {
    event.target.src = this.defaultImageUrl;
  }

  addToCart(): void {
    console.log(this.libro);

    if (!this.libro.disponibilidad || this.libro.cantidad_stock < this.quantity) {
      Swal.fire({
        title: "No Disponible",
        text: "El libro no se encuentra disponible, intente mas tarde",
        icon: "info"
      });
      return
    }
    const libroShopp: LibroPedido = {
      titulo: this.libro.titulo,
      autor_id: this.libro.autor_id._id,
      disponibilidad: this.libro.disponibilidad,
      cantidad_stock: this.libro.cantidad_stock,
      precio: this.libro.precio,
      cantidad_pedido: this.quantity,
      libro_id: this.libro._id
    }

    const exist = this.shoppingService.librosPedio.find(li => li.libro_id === libroShopp.libro_id)
    if (exist) {
      if (exist.cantidad_stock < exist.cantidad_pedido + this.quantity) {
        Swal.fire({
          title: "No Disponible",
          text: "El libro no se encuentra disponible, intente mas tarde",
          icon: "info"
        });
        return
      }
      exist.cantidad_pedido += this.quantity;
    } else {
      console.log(libroShopp);

      this.shoppingService.librosPedio.push(libroShopp)
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "El libro se agrego al carrito",
      showConfirmButton: false,
      timer: 1200
    });
  }

  validateQuantity(): void {
    const stock = this.libro?.cantidad_stock || 0;
    this.isValidQuantity = this.quantity > 0 && this.quantity <= stock;
  }

}