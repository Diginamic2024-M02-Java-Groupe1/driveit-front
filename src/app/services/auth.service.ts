import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@env/environment";
import {CurrentUser} from "@models/current-user.model";

interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.auth;
  private urlApi: string = environment.api;
  private email: string | null = null;

  constructor(private http: HttpClient) { }

  getUserCredentials(): {email: string, password: string} {
    return {
      email: localStorage.getItem('userEmail') || '',
      password: localStorage.getItem('userPassword') || ''
    };
  }

  saveUserCredentials(email: string, password: string): void {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, {email, password});
  }

  setMail(email: string): void {
    this.email = email;
  }

  getMail(): string | null {
    return this.email;
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.url}/register`, {firstName, lastName, email, password});
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this.urlApi}/collaborators/me`);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  verifyAccount(email: string | null, verificationCode: string): Observable<string> {
    return this.http.post<string>(`${this.url}/verify`, {email, verificationCode}, {responseType: 'text' as 'json'});
  }

  resendVerificationCode(email: string | null): Observable<string> {
    if (!email) {
      email = this.email;
    }
    return this.http.post<string>(`${this.url}/resend-verification`, email, {responseType: 'text' as 'json'});
  }
}
