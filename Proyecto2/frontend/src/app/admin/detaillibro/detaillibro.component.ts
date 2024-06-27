import { Libro } from './../../user/interfaces/order.interface';
import { LibroService } from '../../user/services/libro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detaillibro',
  templateUrl: './detaillibro.component.html',
  styleUrl: './detaillibro.component.css'
})
export class DetaillibroComponent implements OnInit {
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