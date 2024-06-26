import { Autor } from './../interfaces/autor.interface';
import { Component, OnInit } from '@angular/core';
import { AutorService } from '../service/autor.service';
import { AuthService, AuthStatus } from './../../auth/services/auth.service';  // Importa el servicio de autenticación y el enum AuthStatus

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private autorService: AutorService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(authStatus => {
      if (authStatus === AuthStatus.Authenticated) {
        this.loadAutores();
      } else {
        this.authService.login('tu_usuario', 'tu_contraseña').subscribe(() => {
          this.loadAutores();
        });
      }
    });
  }

  loadAutores(): void {
    this.autorService.getAutores().subscribe((autores: Autor[]) => {
      this.products = autores.map(autor => ({
        name: autor.nombre,
        description: autor.biografia,
        image: autor.foto_url
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
    // Lógica para agregar el producto al carrito
  }

  verifyProduct(product: any): void {
    console.log('Verificar producto:', product);
    // Lógica para verificar el producto
  }
}