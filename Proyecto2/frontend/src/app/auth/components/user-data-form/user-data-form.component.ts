import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { addressPattern, namePattern, phonePattern } from '../../../shared/validators/patterns';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'auth-user-data-form',
  templateUrl: './user-data-form.component.html',
})
export class UserDataFormComponent implements OnInit {

  @Input() public user?: User;

  private formBuilder = inject(FormBuilder);

  public maxDate: Date;

  public userDataForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(namePattern)]],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.pattern(namePattern)]],
    telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(phonePattern)]],
    fecha_nacimiento: ['', [Validators.required, this.checkMaxDate()]],
    direccion: ['', [Validators.required, Validators.minLength(5), Validators.pattern(addressPattern)]]
  });

  constructor() {
    const currentDate: Date = new Date();
    this.maxDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
  }

  ngOnInit(): void {
    if (this.user) {
      if (this.user) {
        this.userDataForm.patchValue({
          nombre: this.user.nombre,
          apellido: this.user.apellido,
          direccion: this.user.direccion,
          telefono: this.user.telefono,
          fecha_nacimiento: new Date(this.user.fecha_nacimiento).toISOString().split('T')[0]
        });
      }
    }
  }

  private checkMaxDate() {
    return (control: FormControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      if (selectedDate > this.maxDate ) {
        return { maxDate: true }
      }
      return null;
    }
  }

}
