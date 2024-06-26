import { LibroService } from './../service/libro.service';
import { Libro } from './../interfaces/books.interface';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService, AuthStatus } from './../../auth/services/auth.service';  // Importa el servicio de autenticación y el enum AuthStatus
import { ShoppingServieService } from '../../shopping/services/shopping-servie.service';
import { LibroPedido } from '../../shopping/interfaces/libro-pedido';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
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

  private readonly shoppingService = inject(ShoppingServieService)


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
        autor_id: libro.autor_id._id,
        disponibilidad: libro.disponibilidad,
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
        cantidad_stock: libro.cantidad_stock,
        autor_id: libro.autor_id._id,
        disponibilidad: libro.disponibilidad
      }));
      this.filteredProducts = [...this.products];
    });
  }

  addToCart(product: any): void {
    console.log('Producto agregado al carrito:', product);
    if (!product.disponibilidad || product.cantidad_stock < 1) {
      Swal.fire({
        title: "No Disponible",
        text: "El libro no se encuentra disponible, intente mas tarde",
        icon: "info"
      });
      return
    }
    const libroShopp: LibroPedido = {
      titulo: product.name,
      autor_id: product.autor_id._id,
      disponibilidad: product.disponibilidad,
      cantidad_stock: product.cantidad_stock,
      precio: product.price,
      cantidad_pedido: 1,
      libro_id : product._id
    }
    
    const exist = this.shoppingService.librosPedio.find(li => li.libro_id === libroShopp.libro_id)
    if (exist) {
      if (exist.cantidad_stock < exist.cantidad_pedido+1) {
        Swal.fire({
          title: "No Disponible",
          text: "El libro no se encuentra disponible, intente mas tarde",
          icon: "info"
        });
        return
      }
      exist.cantidad_pedido++;
    }else{
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

  verifyProduct(product: any): void {
    console.log('Verificar producto:', product);
    // Próximamente
  }
}