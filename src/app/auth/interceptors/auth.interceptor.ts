import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthRequest =
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/register') ||
    req.url.includes('/auth/reset-password'); // ajuste para os endpoints

  // Só anexa token fora do /auth/*
  const token = authService.getToken();
  if (token && !isAuthRequest) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (!isAuthRequest && (error.status === 401 || error.status === 403)) {
        authService.logout();
        alert('Sessão expirada, faça login novamente');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
