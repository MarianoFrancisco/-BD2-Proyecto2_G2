import { Libro } from './../../user/interfaces/autor.interface';
import { LibroService } from '../../user/services/libro.service';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService, AuthStatus } from './../../auth/services/auth.service';  // Importa el servicio de autenticación y el enum AuthStatus

@Component({
  selector: 'app-vistalibro',
  templateUrl: './vistalibro.component.html',
  styleUrl: './vistalibro.component.css'
})
export class VistalibroComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  filters: any = {
    titulo: '',
    autor: '',
    genero: '',
    minPrecio: null,
    maxPrecio: null,
    minPuntuacion: null
  };


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
        price: libro.precio,
        cantidad_stock: libro.cantidad_stock,
        _id: libro._id
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

  applyFilters(): void {
    const params = {
      titulo: this.filters.titulo,
      autor: this.filters.autor,
      genero: this.filters.genero,
      minPrecio: this.filters.minPrecio,
      maxPrecio: this.filters.maxPrecio,
      minPuntuacion: this.filters.minPuntuacion,
      _id: this.filters._id
    };

    this.libroService.searchLibros(params).subscribe((libros: Libro[]) => {
      this.products = libros.map(libro => ({
        name: libro.titulo,
        description: libro.descripcion,
        image: libro.imagen_url,
        price: libro.precio,
        cantidad_stock: libro.cantidad_stock
      }));
      this.filteredProducts = [...this.products];
    });
  }

  addToCart(product: any): void {
  }

  verifyProduct(product: any): void {
    console.log('Verificar producto:', product);
    // Próximamente
  }
}