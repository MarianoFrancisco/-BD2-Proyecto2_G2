import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../shared/services/libro.service';
import { Book, Review } from '../../models';
import { ToastrService } from 'ngx-toastr';

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
  calificacionPromedio: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libroService: LibroService,
    private toastr:ToastrService
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
        this.actualizarCalificacionPromedio();
      },
      error => {
        console.error('Error al obtener el detalle del libro', error);
        this.toastr.error('Error al obtener el detalle del libro', 'Server');
      }
    );
  }

  getReseñasByLibro(libroId: string): void {
    this.libroService.getReseñasByLibro(libroId).subscribe(
      (resenias: Review[]) => {
        this.resenias = resenias;
        this.actualizarCalificacionPromedio();
        console.log(this.resenias)
      },
      error => {
        console.error('Error al obtener las reseñas del libro', error);
        this.toastr.error('Error al obtener las reseñas del libro', 'Server');
      }
    );
  }

  actualizarCalificacionPromedio(): void {
    if (this.resenias.length > 0) {
      const totalPuntuaciones = this.resenias.reduce((acc, resenia) => acc + resenia.puntuacion, 0);
      this.calificacionPromedio = totalPuntuaciones / this.resenias.length;
    } else {
      this.calificacionPromedio = 0;
    }
  }

  hoverEstrella(calificacion: number): void {
    this.calificacion = calificacion;
  }

  seleccionarCalificacion(calificacion: number): void {
    this.calificacion = calificacion;
  }

  escribirResena(): void {
    this.libroService.guardarReseña(this.libroId, this.resena, this.calificacion).subscribe(
      (response) => {
        this.toastr.success('Reseña guardada exitosamente', 'Server');
        // Actualizar la lista de reseñas después de guardar la nueva reseña
        this.getReseñasByLibro(this.libroId);
        // Limpiar los campos de calificación y reseña después de guardar
        this.calificacion = 0;
        this.resena = '';
      },
      (error) => {
        //console.error('Error al guardar la reseña', error);
        if (error.error.error === 'You have already reviewed this book') {
          this.toastr.error('Ya has realizado una reseña de este libro anteriormente.','server');
        } else {
          this.toastr.error('Ocurrió un error al guardar la reseña. Por favor, intenta nuevamente más tarde.', 'Server');
        }
      }
    );
  }

  generarEstrellas(calificacion: number): number[] {
    const entero = Math.floor(calificacion); 
    const decimal = calificacion - entero;   
    let estrellas: number[] = [];
    for (let i = 0; i < entero; i++) {
      estrellas.push(i + 1);
    }
    if (decimal >= 0.25 && decimal <= 0.75) {
      estrellas.push(0.5); 
    }
    return estrellas;
  }

  volver(): void {
    this.router.navigate(['/user/resenia']);
  }
}
