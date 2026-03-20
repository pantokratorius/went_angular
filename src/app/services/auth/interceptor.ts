import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth-service';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {

          if (req.url.includes('/api/refresh')) {
        return throwError(() => error);
      }

      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;

        return auth.refreshToken().pipe(
          switchMap(() => {
            isRefreshing = false;
            return next(req);
          }),
          catchError(err => {
            isRefreshing = false;
            auth.logout().subscribe();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};