import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "@env/environment";
import {Router} from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly url: string = environment.auth;
    private userData: any = null;
    private readonly userDataSubject = new BehaviorSubject<any>(null);

    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);

    constructor() {
    }

    // async checkSession(): Promise<boolean> {
    //     try {
    //         const user = await this.http.get<any>(`${environment.api}/collaborators/me`, {withCredentials: true}).toPromise();
    //         this.userData = {
    //             role: user.authorities[0].authority,
    //             userId: user.id,
    //             nom: user.lastName,
    //             prenom: user.firstName,
    //         };
    //         this.userDataSubject.next(this.userData);
    //         return true;
    //     } catch {
    //         this.clearUserData();
    //         return false;
    //     }
    // }

    async checkSession(): Promise<boolean> {
        try {
            const user = await firstValueFrom(
                this.http.get<any>(`${environment.api}/collaborators/me`, { withCredentials: true })
            );
            this.userData = {
                role: user.authorities[0].authority,
                userId: user.id,
                nom: user.lastName,
                prenom: user.firstName,
            };
            this.userDataSubject.next(this.userData);
            return true;
        } catch {
            this.clearUserData();
            return false;
        }
    }

    register(firstName: string, lastName: string, email: string, password: string): Observable<string> {
        return this.http.post<string>(`${this.url}/register`, {firstName, lastName, email, password});
    }

    verifyAccount(email: string | null, verificationCode: string): Observable<string> {
        return this.http.post<string>(`${this.url}/verify`, {
            email,
            verificationCode
        }, {responseType: 'text' as 'json'});
    }

    resendVerificationCode(email: string | null): Observable<string> {
        email ??= this.getUserEmail();
        return this.http.post<string>(`${this.url}/resend-verification`, email, {responseType: 'text' as 'json'});
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.url}/login`, {email, password})
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
            error: () => this.finalizeLogout()
        });
    }

    logoutWithForceRedirect(): void {
        this.clearUserData();
        this.router.navigate(['/auth/login']).then();
        fetch(`${this.url}/logout`, {
            method: 'POST',
            credentials: 'include'
        }).catch(() => {
            console.error('Erreur pendant la déconnexion du serveur');
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

        this.userDataSubject.next(this.userData);
    }

    private clearUserData(): void {
        this.userData = null;
        this.userDataSubject.next(null);
    }

    get user$() {
        return this.userDataSubject.asObservable();
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

}
