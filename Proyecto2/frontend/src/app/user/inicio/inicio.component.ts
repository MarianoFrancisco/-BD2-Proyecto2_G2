import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
