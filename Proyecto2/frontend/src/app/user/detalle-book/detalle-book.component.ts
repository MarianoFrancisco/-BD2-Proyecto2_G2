import { Libro } from './../interfaces/books.interface';
import { LibroService } from '../services/libro.service';
import { RegistryBooksService } from '../../admin/service/registry-books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models';

@Component({
  selector: 'app-detalle-book',
  templateUrl: './detalle-book.component.html',
  styleUrl: './detalle-book.component.css'
})

export class DetalleBookComponent implements OnInit {
  libro: Libro | undefined | any;
  resenas: Review[] = [];
  defaultImageUrl: string = '../../../assets/libro.png';

  constructor(private route: ActivatedRoute, private libroService: LibroService,private registryBooksService: RegistryBooksService) { }

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
}