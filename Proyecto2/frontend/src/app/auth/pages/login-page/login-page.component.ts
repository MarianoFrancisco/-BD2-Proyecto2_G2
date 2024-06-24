import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    contrasenia: ['', [Validators.required]]
  });

  onLogin(): void {
    if (this.loginForm.valid) {

    }
  }




}
