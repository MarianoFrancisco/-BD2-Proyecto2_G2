import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibroService } from '../../shared/services/libro.service';
import { Book, Order } from '../../models';

@Component({
  selector: 'app-resenia',
  templateUrl: './resenia.component.html',
  styleUrls: ['./resenia.component.css']
})
export class ReseniaComponent implements OnInit {
  books: Book[] = [];
  private userId = "667777f7844f7574bb644462"; // ID de usuario de ejemplo

  constructor(private router: Router, private libroService: LibroService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.libroService.getOrdersByUserId(this.userId)
      .subscribe(
        (orders: Order) => {
          if (orders.libros.length > 0) {
            this.books = orders.libros.map(item => item.libro_id);
            //console.log('Libros obtenidos:', this.books);
          }
        },
        error => {
          console.error('Error al obtener órdenes:', error);
        }
      );
  }

  verDetalle(book: Book): void {
    this.router.navigate(['/user/resenia', book._id]);
  }
}
