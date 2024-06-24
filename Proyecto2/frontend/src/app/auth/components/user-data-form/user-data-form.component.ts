import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrl: './user-data-form.component.css'
})
export class UserDataFormComponent {

  private formBuilder = inject(FormBuilder);

  public userDataForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    fecha_nacimiento: ['', [Validators.required]],
    direccion: ['', [Validators.required]]
  });

  constructor() {}

}
