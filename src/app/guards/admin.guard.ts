import { Injectable } from "@angular/core";
import {CanActivate, Route, Router, UrlSegment} from "@angular/router";
import { Observable } from "rxjs";
import {AuthService} from "@services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const isAuthenticated = this.authService.isAuthenticated();
      const isAdmin = this.authService.isAdmin();
      if (isAuthenticated && isAdmin) {
        observer.next(true);
      } else {
        this.router.navigate(['/']).then();
        observer.next(false);
      }
      observer.complete();
    });
  }

}
