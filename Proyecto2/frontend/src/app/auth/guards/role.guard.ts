import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';
import { UserRole } from '../interfaces/user.interface';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.currentUser().pipe(
    filter(user => user !== null),
    take(1),
    map(user => {
      if (user!.rol === route.data['rol']) return true;
      if (user!.rol === UserRole.Cliente) {
        router.navigateByUrl('/user');
      } else {
        router.navigateByUrl('/admin');
      }
      return false;
    })
  );
};
