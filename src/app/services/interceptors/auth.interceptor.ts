import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

// Variables de fermeture pour gérer l'état de rafraîchissement
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<boolean>(false);

export const AuthInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  // Cloner la requête avec withCredentials
  request = request.clone({
    withCredentials: true
  });

  // Ignorer la requête de déconnexion
  const isLogoutRequest = request.url.includes('/auth/logout');
  if (isLogoutRequest) {
    return next(request);
  }

  // Intercepter les erreurs 401
  return next(request).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(request, next, authService);
      } else {
        return throwError(() => error);
      }
    })
  );
};

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
  if (!authService.isLoggedIn()) {
    authService.logout();
    return throwError(() => new Error('Utilisateur déconnecté'));
  }

  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(false);

    return authService.refreshToken().pipe(
      switchMap(() => {
        isRefreshing = false;
        refreshTokenSubject.next(true);
        return next(request);
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logoutWithForceRedirect();
        return throwError(() => err);
      }),
      finalize(() => {
        isRefreshing = false;
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter(refreshed => refreshed),
    take(1),
    switchMap(() => next(request))
  );
}
