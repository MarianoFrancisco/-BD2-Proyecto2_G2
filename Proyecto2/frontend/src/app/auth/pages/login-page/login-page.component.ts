import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { emailPattern, passwordPattern } from '../../../shared/validators/patterns';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private notifService = inject(NotificationService);

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.pattern(emailPattern)]],
    contrasenia: ['', [Validators.required, Validators.minLength(5), Validators.pattern(passwordPattern)]]
  });

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, contrasenia } = this.loginForm.value;
      this.authService.login(email, contrasenia).subscribe({
        next: () => {
          this.notifService.show('Bienvenido a BookStore.', 'success');
          this.router.navigateByUrl('/homeUser');
        },
        error: () => this.notifService.show('Usuario no encontrado.')
      });
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (!control.touched) {
          control.markAsTouched();
        }
      });
      this.notifService.show('Campos invalidos o vacios.', 'warning');
    }
  }

}
