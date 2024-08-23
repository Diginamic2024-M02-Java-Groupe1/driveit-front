import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@env/environment";

interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.auth;

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

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
