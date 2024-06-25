import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'auth-user-data-form',
  templateUrl: './user-data-form.component.html',
})
export class UserDataFormComponent {

  private formBuilder = inject(FormBuilder);
  public maxDate: Date;

  public userDataForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[A-Za-z ]+$")]],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[A-Za-z ]+$")]],
    telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]{8}$")]],
    fecha_nacimiento: ['', [Validators.required, this.checkMaxDate()]],
    direccion: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[A-Za-z0-9., ]+$")]]
  });

  constructor() {
    const currentDate: Date = new Date();
    this.maxDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
  }

  private checkMaxDate(): ValidationErrors {
    return (control: FormControl) => {
      const selectedDate = new Date(control.value);
      console.log(this.maxDate)
      if (selectedDate > this.maxDate ) {
        return { maxDate: true }
      }
      return null;
    }
  }

}
