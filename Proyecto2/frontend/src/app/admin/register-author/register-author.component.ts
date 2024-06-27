import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistryBooksService } from '../service/registry-books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-author',
  templateUrl: './register-author.component.html',
  styleUrls: ['./register-author.component.css']
})
export class RegisterAuthorComponent {

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null; 

  constructor(private registryBooksService: RegistryBooksService, private toastr: ToastrService) {}

  onSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('nombre', form.value.nombre);
    formData.append('biografia', form.value.biografia);
    
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    this.registryBooksService.registerAuthor(formData).subscribe(
      response => {
        console.log('Autor registrado exitosamente', response);
        this.toastr.success('Autor registrado exitosamente', 'Éxito');
        form.reset();
        this.selectedFile = null;
        this.imagePreview = null;
      },
      error => {
        console.error('Error al registrar el autor', error);
        this.toastr.error('Error al registrar el autor', 'Error');
      }
    );
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
}
