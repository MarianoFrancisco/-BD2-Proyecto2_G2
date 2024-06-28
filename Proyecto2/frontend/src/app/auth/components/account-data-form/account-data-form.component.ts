import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPattern, passwordPattern } from '../../../shared/validators/patterns';
import { isFieldOneEqualsFieldTwo } from '../../../shared/validators/validators';

@Component({
  selector: 'auth-account-data-form',
  templateUrl: './account-data-form.component.html',
})
export class AccountDataFormComponent {

  private formBuilder = inject(FormBuilder);

  public accountDataForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.pattern(emailPattern)]],
    contrasenia: ['', [Validators.required, Validators.minLength(5), Validators.pattern(passwordPattern)]],
    c_contrasenia: ['', [Validators.required, Validators.minLength(5), Validators.pattern(passwordPattern)]],
  }, {
    validators: [
      isFieldOneEqualsFieldTwo('contrasenia', 'c_contrasenia')
    ]
  });

  constructor() {}

}
