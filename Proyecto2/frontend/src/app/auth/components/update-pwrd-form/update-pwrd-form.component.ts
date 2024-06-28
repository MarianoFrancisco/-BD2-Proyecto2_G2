import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordPattern } from '../../../shared/validators/patterns';
import { isFieldOneEqualsFieldTwo } from '../../../shared/validators/validators';

@Component({
  selector: 'auth-update-pwrd-form',
  templateUrl: './update-pwrd-form.component.html',
  styles: ``
})
export class UpdatePwrdFormComponent {

  private formBuilder = inject(FormBuilder);

  public passwordForm: FormGroup = this.formBuilder.group({
    contrasenia_actual: ['', [Validators.required, Validators.minLength(5), Validators.pattern(passwordPattern)]],
    contrasenia: ['', [Validators.required, Validators.minLength(5), Validators.pattern(passwordPattern)]],
    c_contrasenia: ['', [Validators.required, Validators.minLength(5), Validators.pattern(passwordPattern)]],
  }, {
    validators: [
      isFieldOneEqualsFieldTwo('contrasenia', 'c_contrasenia')
    ]
  });

  constructor() {}
  
}
