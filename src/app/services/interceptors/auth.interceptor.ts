import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

// isRefreshing and refreshTokenSubject need to be outside the interceptor function
// to maintain state across requests
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<boolean>(false);

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  request = request.clone({
    withCredentials: true
  });

  const isLogoutRequest = request.url.includes('/auth/logout');

  if (isLogoutRequest) {
    return next(request);
  }

  return next(request).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(request, next, authService);
      } else {
        return throwError(() => error);
      }
    })
  );
}

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  // Implementation remains the same
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
