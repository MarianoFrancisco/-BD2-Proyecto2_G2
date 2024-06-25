import { LibroService } from './../service/libro.service';
import { Libro } from './../interfaces/books.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService, AuthStatus } from './../../auth/services/auth.service';  // Importa el servicio de autenticación y el enum AuthStatus

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private libroService: LibroService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(authStatus => {
      if (authStatus === AuthStatus.Authenticated) {
        this.loadLibros();
      } else {
        this.authService.login('tu_usuario', 'tu_contraseña').subscribe(() => {
          this.loadLibros();
        });
      }
    });
  }

  loadLibros(): void {
    this.libroService.getLibros().subscribe((libros: Libro[]) => {
      this.products = libros.map(libro => ({
        name: libro.titulo,
        description: libro.descripcion,
        image: libro.imagen_url,
        price: libro.precio // Agrega el precio aquí
      }));
      this.filteredProducts = [...this.products];
    });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  addToCart(product: any): void {
    console.log('Producto agregado al carrito:', product);
    // Próximamente
  }

  verifyProduct(product: any): void {
    console.log('Verificar producto:', product);
    // Próximamente
  }
}