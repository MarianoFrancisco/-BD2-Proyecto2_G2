import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../shared/services/libro.service';
import { Book, Review } from '../../models';

@Component({
  selector: 'app-detalle-resenia',
  templateUrl: './detalle-resenia.component.html',
  styleUrls: ['./detalle-resenia.component.css']
})
export class DetalleReseniaComponent implements OnInit {
  libroId: string = '';
  libro: Book | null = null;
  calificacion: number = 0;
  resena: string = '';
  resenias: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libroService: LibroService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.libroId = params['id'];
      this.getLibroDetail(this.libroId);
      this.getReseñasByLibro(this.libroId);
    });
  }

  getLibroDetail(id: string): void {
    this.libroService.getLibroById(id).subscribe(
      (libro: Book) => {
        this.libro = libro;
        console.log(this.libro)
      },
      error => {
        console.error('Error al obtener el detalle del libro', error);
      }
    );
  }

  getReseñasByLibro(libroId: string): void {
    this.libroService.getReseñasByLibro(libroId).subscribe(
      (resenias: Review[]) => {
        this.resenias = resenias;
        console.log(this.resenias)
      },
      error => {
        console.error('Error al obtener las reseñas del libro', error);
      }
    );
  }

  escribirResena(): void {
    console.log('Calificación:', this.calificacion);
    console.log('Reseña:', this.resena);

    this.libroService.guardarReseña(this.libroId, this.resena, this.calificacion).subscribe(
      (response) => {
        console.log('Reseña guardada exitosamente', response);
        // Actualizar la lista de reseñas después de guardar la nueva reseña
        this.getReseñasByLibro(this.libroId);
        // Limpiar los campos de calificación y reseña después de guardar
        this.calificacion = 0;
        this.resena = '';
      },
      (error) => {
        console.error('Error al guardar la reseña', error);
        if (error.error === 'You have already reviewed this book') {
          alert('Ya has realizado una reseña de este libro anteriormente.');
        } else {
          alert('Ocurrió un error al guardar la reseña. Por favor, intenta nuevamente más tarde.');
        }
      }
    );
  }

  generarEstrellas(calificacion: number): number[] {
    return Array(calificacion).fill(0).map((x, i) => i + 1);
  }

  volver(): void {
    this.router.navigate(['/user/resenia']);
  }
}
