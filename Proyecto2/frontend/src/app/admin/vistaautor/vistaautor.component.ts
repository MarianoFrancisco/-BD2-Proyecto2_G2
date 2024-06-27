import { AutorService } from './../../user/services/autor.service';
import { Autor } from './../../user/interfaces/autor.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService, AuthStatus } from './../../auth/services/auth.service';  // Importa el servicio de autenticación y el enum AuthStatus
@Component({
  selector: 'app-vistaautor',
  templateUrl: './vistaautor.component.html',
  styleUrl: './vistaautor.component.css'
})
export class VistaautorComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  defaultImageUrl: string = '../../../assets/autor.png';

  constructor(private autorService: AutorService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAutores();
  }

  loadAutores(): void {
    this.autorService.getAutores().subscribe((autores: Autor[]) => {
      this.products = autores.map(autor => ({
        name: autor.nombre,
        description: autor.biografia,
        image: autor.foto_url,
        id: autor._id
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
  imgError(event: any): void {
    event.target.src = this.defaultImageUrl;
  }
}