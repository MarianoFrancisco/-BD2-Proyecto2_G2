import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  @ViewChild('snackbar') snackbar: SnackBarComponent = new SnackBarComponent();

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    contrasenia: ['', [Validators.required]]
  });

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, contrasenia } = this.loginForm.value;
      this.authService.login(email, contrasenia).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: () => this.snackbar.show('Usuario no encontrado.')
      });
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (!control.touched) {
          control.markAsTouched();
        }
      });
      this.snackbar.show('Campos vacios o invalidos.')
    }
  }




}
