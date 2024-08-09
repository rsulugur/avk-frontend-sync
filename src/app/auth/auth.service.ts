import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private destroyRef: DestroyRef = inject(DestroyRef);

    constructor(private router: Router, private http: HttpClient) {
        // Check if user is already logged in (e.g., based on a token in local storage)
        const token = sessionStorage.getItem('X-Auth-Token');
        this.isLoggedInSubject.next(!!token);
    }

    login(username: string, password: string) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify({ username, password });

        const sub = this.http.post<any>('http://localhost:8080/auth/login', body, { headers })
            .subscribe({
                next: response => {
                    const token = response.token;
                    sessionStorage.setItem('X-Auth-Token', token);
                    this.isLoggedInSubject.next(true);
                    this.router.navigate(['/'], { replaceUrl: true });
                },
                error: (e) => console.log("Error", e)
            })

        this.destroyRef.onDestroy(() => sub.unsubscribe());
    }

    logout(): void {
        sessionStorage.removeItem('X-Auth-Token');
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/login'], { replaceUrl: true });
    }

    isLoggedIn(): boolean {
        const jwtToken = sessionStorage.getItem('X-Auth-Token');
        return !!jwtToken;
    }
}
