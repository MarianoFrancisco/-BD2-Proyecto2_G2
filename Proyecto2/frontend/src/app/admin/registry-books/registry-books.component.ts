import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistryBooksService } from '../service/registry-books.service';
import { AuthorWithBooks, Genero, Book } from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registry-books',
  templateUrl: './registry-books.component.html',
  styleUrls: ['./registry-books.component.css']
})
export class RegistryBooksComponent implements OnInit {
  selectedFile: File | null = null;
  authors: AuthorWithBooks[] = [];
  genres: Genero[] = [];
  imagePreview: string | ArrayBuffer | null = null; // Variable para la vista previa de la imagen

  constructor(private registryBooksService: RegistryBooksService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadAuthors();
    this.loadGenres();
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

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;

      // Mostrar vista previa de la imagen seleccionada
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    }
  }

  onSubmit(form: NgForm) {
    const cantidadStock = parseInt(form.value.cantidad_stock);
    const precio = parseFloat(form.value.precio);

    if (cantidadStock < 0) {
      console.error('La cantidad en stock no puede ser negativa');
      this.toastr.error('La cantidad en stock no puede ser negativa', 'Server');
      return;
    }

    if (precio < 0) {
      console.error('El precio no puede ser negativo');
      this.toastr.error('El precio no puede ser negativo', 'Server');
      return;
    }

    form.value.puntuacion_promedio = 0;

    const formData = new FormData();
    formData.append('titulo', form.value.titulo);
    formData.append('autor_id', form.value.autor_id);
    formData.append('descripcion', form.value.descripcion);
    formData.append('genero_id', form.value.genero_id);
    formData.append('fecha_publicacion', form.value.fecha_publicacion);
    formData.append('disponibilidad', form.value.disponibilidad ? 'true' : 'false');
    formData.append('cantidad_stock', form.value.cantidad_stock);
    formData.append('puntuacion_promedio', form.value.puntuacion_promedio);
    formData.append('precio', form.value.precio);
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    this.registryBooksService.registrarLibro(formData).subscribe(
      response => {
        console.log('Libro registrado exitosamente', response);
        this.toastr.success('Libro registrado exitosamente', 'Server');
        form.reset();
        this.selectedFile = null;
        this.imagePreview = null;
      },
      error => {
        console.error('Error al registrar el libro', error);
        this.toastr.error('Error al registrar el libro', 'Server');
      }
    );
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
