import { Autor } from './../../user/interfaces/autor.interface';
import { AutorService } from './../../user/services/autor.service';
import { RegistryBooksService } from '../service/registry-books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailautor',
  templateUrl: './detailautor.component.html',
  styleUrl: './detailautor.component.css'
})
export class DetailautorComponent implements OnInit {
  autor: Autor | undefined;
  id: string = '';

  constructor(private route: ActivatedRoute, private autorService: AutorService,private toastr:ToastrService,private registryBooksService: RegistryBooksService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.id=id;
        this.autorService.getAutorById(id).subscribe(autor => {
          this.autor = autor;
        });
      }
    });
  }

  confirmDeleteAutor(): void {
    this.toastr.warning('¿Estás seguro de que deseas eliminar este autor?', 'Confirmar eliminación', {
      positionClass: 'toast-top-center',
      closeButton: true,
      disableTimeOut: true,
    }).onTap.subscribe(() => {
      this.deleteAutor();
    });
  }

  deleteAutor(): void {
    this.registryBooksService.deleteAuthorById(this.id).subscribe(
      response => {
        this.toastr.success('Autor eliminado correctamente', 'Éxito');
        this.router.navigate(['/admin/view-author']); 
      },
      error => {
        this.toastr.error('Error al eliminar el autor', 'Error');
        console.error('Error al eliminar el autor', error);
      }
    );
  }

}