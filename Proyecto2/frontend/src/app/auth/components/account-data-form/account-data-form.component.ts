import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-account-data-form',
  templateUrl: './account-data-form.component.html',
})
export class AccountDataFormComponent {

  private formBuilder = inject(FormBuilder);

  public accountDataForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    contrasenia: ['', [Validators.required]],
    c_contrasenia: ['', [Validators.required]],
  });

  constructor() {}

}
