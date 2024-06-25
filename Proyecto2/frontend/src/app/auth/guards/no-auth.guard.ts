import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, tap } from 'rxjs';
import { AuthStatus } from '../interfaces/user.interface';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isLoggedIn().pipe(
    filter((status) => status !== AuthStatus.Checking),
    map((status) => {
      if (status === AuthStatus.NotAuthenticated) {
        return true;
      }
      router.navigateByUrl('/');
      return false;
    })
  );
};
