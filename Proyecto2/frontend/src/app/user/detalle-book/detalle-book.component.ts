import { Libro } from './../interfaces/books.interface';
import { LibroService } from './../service/libro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-book',
  templateUrl: './detalle-book.component.html',
  styleUrl: './detalle-book.component.css'
})
export class DetalleBookComponent implements OnInit {
  libro: Libro | undefined | any;

  constructor(private route: ActivatedRoute, private libroService: LibroService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.libroService.getLibroById(id).subscribe(libro => {
          this.libro = libro;
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
}