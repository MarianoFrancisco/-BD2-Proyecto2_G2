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
    // Aquí puedes llamar a tu servicio para guardar la reseña
    // Ejemplo: this.libroService.guardarReseña(this.libroId, this.calificacion, this.resena).subscribe(...)
  }

  generarEstrellas(calificacion: number): number[] {
    return Array(calificacion).fill(0).map((x, i) => i + 1);
  }

  volver(): void {
    this.router.navigate(['/user/resenia']);
  }
}
