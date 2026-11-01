import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const redirectToLogin = () => inject(Router).createUrlTree(['/login']);

export const studentGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isStudent() ? true : redirectToLogin();
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isAdmin() ? true : redirectToLogin();
};
