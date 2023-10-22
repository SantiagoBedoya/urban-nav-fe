import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { lastValueFrom } from 'rxjs';

export const validateTokenGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('access_token');
  if (!token) {
    if (route.url.length == 0) {
      return true;
    }
    router.navigate(['']);
    return false;
  }
  try {
    const isValid = await lastValueFrom(authService.validateToken(token));
    if (route.url.length == 0) {
      router.navigate(['dashboard']);
    }
    return true;
  } catch (err) {
    localStorage.removeItem('access_token');
    router.navigate(['']);
    return false;
  }
};
