import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibroService } from '../../shared/services/libro.service';
import { Book, Order } from '../../models';
import { AuthService } from './../../auth/services/auth.service'; 
import { Subscription } from 'rxjs';
import { User } from '../../auth/interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resenia',
  templateUrl: './resenia.component.html',
  styleUrls: ['./resenia.component.css']
})
export class ReseniaComponent implements OnInit {
  books: Book[] = [];
  private userSub?: Subscription;
  public user?: User;
  public userId?: string;
  defaultImageUrl: string = '../../../assets/libro.png'; 

  constructor(private router: Router, private libroService: LibroService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userSub = this.authService.currentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.userId = this.user._id;
        if (this.userId) {
          this.getOrders();
        }
      }
    });
  }
  

  getOrders() {
    if (!this.userId) {
      console.error('User ID is undefined.');
      return;
    }
    this.libroService.getOrdersByUserId(this.userId)
      .subscribe(
        (orders: Order[]) => {
          if (orders.length > 0) {
            const bookMap = new Map<string, Book>();
            orders.forEach(order => {
              order.libros.forEach(item => {
                bookMap.set(item.libro_id._id, item.libro_id);
              });
            });
            this.books = Array.from(bookMap.values());
          }
        },
        error => {
          this.toastr.error('Error al obtener órdenes:','server');
        }
      );
  }

  verDetalle(book: Book): void {
    this.router.navigate(['/user/resenia', book._id]);
  }

  imgError(event: any): void {
    event.target.src = this.defaultImageUrl;
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
