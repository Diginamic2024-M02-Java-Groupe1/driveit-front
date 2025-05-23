// src/app/services/error-handler.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(err: HttpErrorResponse, context?: string): void {
    console.error(`Erreur ${context ? 'lors de ' + context : ''}:`, err);

    try {
      const errorObj = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
      toast.error(errorObj.message || 'Une erreur est survenue');
    } catch (e) {
      toast.error('Une erreur inattendue est survenue');
    }
  }
}
