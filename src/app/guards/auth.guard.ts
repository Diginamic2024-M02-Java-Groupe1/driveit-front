import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "@services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  /** The method that checks if the user is authenticated
   * @returns An observable that emits true if the user is authenticated, false otherwise
   */
  canActivate(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const isAuthenticated = this.authService.isAuthenticated();
      if (isAuthenticated) {
        observer.next(true);
      } else {
        this.router.navigate(['/auth']);
        observer.next(false);
      }
      observer.complete();
    });
  }
}
