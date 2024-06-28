import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegistryBooksService } from '../service/registry-books.service';
import { AuthorWithBooks, Genero, Book } from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  selectedFile: File | null = null;
  authors: AuthorWithBooks[] = [];
  genres: Genero[] = [];
  book: Book | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private registryBooksService: RegistryBooksService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAuthors();
    this.loadGenres();
    this.loadBook();
  }

  loadAuthors() {
    this.registryBooksService.getAllAuthors().subscribe(
      (authors: AuthorWithBooks[]) => {
        this.authors = authors;
      },
      error => {
        console.error('Error al cargar los autores', error);
        this.toastr.error('Error al cargar los autores', 'Server');
      }
    );
  }

  loadGenres() {
    this.registryBooksService.getAllGenres().subscribe(
      (genres: Genero[]) => {
        this.genres = genres;
      },
      error => {
        console.error('Error al cargar los géneros', error);
        this.toastr.error('Error al cargar los géneros', 'Server');
      }
    );
  }

  loadBook() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.registryBooksService.getBookById(id).subscribe(
        (book: Book) => {
          this.book = book;
          this.imagePreview = book.imagen_url; 
          if (typeof this.book.fecha_publicacion === 'string') {
            const dateParts = this.book.fecha_publicacion.split('T')[0].split('-'); 
            this.book.fecha_publicacion = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2])).toISOString().substring(0, 10);
          }
        },
        error => {
          console.error('Error al cargar el libro', error);
          this.toastr.error('Error al cargar el libro', 'Server');
        }
      );
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    }
  }

  onSubmit(form: NgForm) {
    if (!this.book) {
      return;
    }
  
    // Validar y convertir valores según sea necesario
    const cantidadStock = parseInt(form.value.cantidad_stock, 10); 
    const precio = parseFloat(form.value.precio); 
  
    // Validar valores no negativos
    if (cantidadStock < 0) {
      console.error('La cantidad en stock no puede ser negativa');
      this.toastr.error('La cantidad en stock no puede ser negativa', 'Error');
      return;
    }
  
    if (precio < 0) {
      console.error('El precio no puede ser negativo');
      this.toastr.error('El precio no puede ser negativo', 'Error');
      return;
    }
  
    // Create FormData object
    const formData = new FormData();
    formData.append('titulo', form.value.titulo);
    formData.append('autor_id', form.value.autor_id);
    formData.append('descripcion', form.value.descripcion);
    formData.append('genero_id', form.value.genero_id);
    formData.append('fecha_publicacion', form.value.fecha_publicacion);
    formData.append('disponibilidad', form.value.disponibilidad);
    formData.append('cantidad_stock', cantidadStock.toString());
    formData.append('puntuacion_promedio', this.book.puntuacion_promedio.toString());
    formData.append('precio', precio.toString());
    formData.append('imagen_url', this.book.imagen_url);
  
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }
  
    // Llamar al servicio para actualizar el libro
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.registryBooksService.updatebook(formData, id).subscribe(
        response => {
          this.toastr.success('Libro actualizado exitosamente', 'Server');
        },
        error => {
          console.error('Error al actualizar el libro', error);
          this.toastr.error('Error al actualizar el libro', 'Server');
        }
      );
    } else {
      console.error('No se encontró el ID del libro');
      this.toastr.error('No se encontró el ID del libro', 'Error');
    }
  }

  validateNonNegativeNumber(event: Event): boolean {
    const inputElement = event.target as HTMLInputElement;
    const value = parseFloat(inputElement.value);
    if (value < 0) {
      inputElement.value = '0';
      return false;
    }
    return true;
  }
}
