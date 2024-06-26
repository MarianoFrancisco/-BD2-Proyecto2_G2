import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'shared-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {

  @Input({ required: true }) public module!: 'Administracion' | 'Cliente';

  private router = inject(Router);
  private authService = inject(AuthService);

  public onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}
