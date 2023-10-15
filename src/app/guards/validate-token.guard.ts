import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { lastValueFrom } from 'rxjs';

export const validateTokenGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('access_token');
  if (!token) {
    router.navigate(['']);
    return false;
  }
  try {
    const isValid = await lastValueFrom(authService.validateToken(token));
    return true;
  } catch (err) {
    router.navigate(['']);
    return false;
  }
};
