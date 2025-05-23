import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur inattendue est survenue';

      if (error.error) {
        try {
          const errorObj = typeof error.error === 'string' ? JSON.parse(error.error) : error.error;
          errorMessage = errorObj.message || errorMessage;
        } catch (e) {
          console.error('Erreur de parsing du message d\'erreur', e);
        }
      }

      toast.error(errorMessage);

      return throwError(() => error);
    })
  );
};
