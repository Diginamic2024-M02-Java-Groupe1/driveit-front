import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "@env/environment";
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.auth;
  private userData: any = null;
  private readonly userDataSubject = new BehaviorSubject<any>(null);

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      this.userData = JSON.parse(userDataStr);
      this.userDataSubject.next(this.userData);
    }
  }

  get user$() {
    return this.userDataSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, { email, password })
      .pipe(
        tap(response => {
          this.storeUserData(response);
        })
      );
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.url}/refresh`, {})
      .pipe(
        tap(response => {
          this.storeUserData(response);
        })
      );
  }

  logout(): void {
    this.http.post(`${this.url}/logout`, {}).subscribe({
      next: () => this.finalizeLogout(),
      error:() => this.finalizeLogout()
    });
  }

  private finalizeLogout(): void {
    this.clearUserData();
    this.router.navigate(['/auth/login']).then();
  }

  private storeUserData(response: any): void {
    this.userData = {
      role: response.role,
      userId: response.userId,
      nom: response.nom,
      prenom: response.prenom
    };

    localStorage.setItem('userData', JSON.stringify(this.userData));
    this.userDataSubject.next(this.userData);
  }

  private clearUserData(): void {
    this.userData = null;
    localStorage.removeItem('userData');
    this.userDataSubject.next(null);
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.url}/register`, {firstName, lastName, email, password});
  }

  isLoggedIn(): boolean {
    return !!this.userData;
  }

  getUserRole(): string | undefined {
    return this.userData?.role;
  }

  getUserId(): string | undefined {
    return this.userData?.userId;
  }

  getUserEmail(): string | null {
    return this.userData?.email;
  }

  storeUserEmail(email: string): void {
    localStorage.setItem('pendingVerificationEmail', email);
  }

  getPendingVerificationEmail(): string | null {
    return localStorage.getItem('pendingVerificationEmail');
  }

  clearPendingVerificationEmail(): void {
    localStorage.removeItem('pendingVerificationEmail');
  }

  verifyAccount(email: string | null, verificationCode: string): Observable<string> {
    return this.http.post<string>(`${this.url}/verify`, {email, verificationCode}, {responseType: 'text' as 'json'});
  }

  resendVerificationCode(email: string | null): Observable<string> {
    email ??= this.getUserEmail();
    return this.http.post<string>(`${this.url}/resend-verification`, email, {responseType: 'text' as 'json'});
  }


}
