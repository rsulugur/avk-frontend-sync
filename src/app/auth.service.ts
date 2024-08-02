import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

    constructor(private router: Router) {
        // Check if user is already logged in (e.g., based on a token in local storage)
        const token = localStorage.getItem('authToken');
        this.isLoggedInSubject.next(!!token);
    }

    // Check if token exists in local storage
    private hasToken(): boolean {
        return !!localStorage.getItem('authToken');
    }

    login(token: string): void {
        localStorage.setItem('authToken', token);
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/']); // Redirect to the default route
    }

    logout(): void {
        localStorage.removeItem('authToken');
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return this.hasToken();
    }
}
