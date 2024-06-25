import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  products = [
    {
      name: 'Autor 1',
      description: 'Descripción del Autor 1',
      image: '../../../assets/portatil.png',
    },
    {
      name: 'Autor 2',
      description: 'Descripción del Autor 2',
      image: '../../../assets/portatil.png'
    },
    {
      name: 'Autor 3',
      description: 'Descripción del Autor 2',
      image: '../../../assets/portatil.png'
    },
  
    // Solo para probar xD
  ];
  
  filteredProducts = [...this.products];

  constructor() { }

  ngOnInit(): void {
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
    //Proximamente
  }

  verifyProduct(product: any): void {
    console.log('Verificar producto:', product);
    //Proximamente
  }
}
