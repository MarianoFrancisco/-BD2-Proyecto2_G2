import { Libro } from './../../user/interfaces/order.interface';
import { LibroService } from '../../user/services/libro.service';
import { RegistryBooksService } from '../service/registry-books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detaillibro',
  templateUrl: './detaillibro.component.html',
  styleUrl: './detaillibro.component.css'
})
export class DetaillibroComponent implements OnInit {
  libro: Libro | undefined | any;
  id: string ='';

  constructor(private route: ActivatedRoute, private libroService: LibroService, private registryBooksService: RegistryBooksService, private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.id=id;
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

  confirmDelete(): void {
    this.toastr.warning('Presioneme si está seguro de que deseas eliminar este libro', 'Confirmar', {
      positionClass: 'toast-top-center',
      closeButton: true,
      disableTimeOut: true,
    }).onTap.subscribe(() => {
      this.deleteLibro();
    });
  }

  deleteLibro(): void {
    this.registryBooksService.deleteBookById(this.id).subscribe(
      response => {
       //console.log('Libro eliminado', response);
        this.toastr.success('Libro eliminado', 'Server');
        this.router.navigate(['/admin/view-book']);
      },
      error => {
        //console.error('Error al eliminar el libro', error);
        this.toastr.error('Error al eliminar el libro', 'Server');
      }
    );
  }

}