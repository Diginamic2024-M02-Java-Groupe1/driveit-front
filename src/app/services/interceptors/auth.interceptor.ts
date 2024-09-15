import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from "@services/auth.service";
import {inject} from "@angular/core";
import {catchError, switchMap, throwError} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (!token) {
    return next(req)
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  const newReq = req.clone({
    headers
  })

  return next(newReq).pipe(
    catchError(error => {
      if (error.status === 403) {
        return auth.refreshToken().pipe(
          switchMap((response) => {
            const newToken = response.token;
            const newHeaders = new HttpHeaders({
              Authorization: `Bearer ${newToken}`
            });
            const retryReq = req.clone({
              headers: newHeaders
            });
            return next(retryReq);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
